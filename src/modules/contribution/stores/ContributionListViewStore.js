import { action, observable } from 'mobx';
import { ContributionService, LookupService, DonorAccountService } from "common/data";
import { ContributionListFilter } from 'modules/contribution/models';
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import { getDonorNameDropdown } from 'core/utils';
import _ from 'lodash';

class ContributionListViewStore extends BaseListViewStore {
    paymentTypeDropdownStore = null;
    contributionStatusDropdownStore = null;
    contributionStatuses = null;
    @observable loaded = false;
    @observable reviewId = null;
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'contribution',
            routes: {
                edit: (contributionId, userId) =>
                    this.rootStore.routerStore.navigate('master.app.main.contribution.edit', {
                        contributionId: contributionId,
                        id: userId
                    }),
                create: () => {
                    if (rootStore.routerStore.routerState.params.id) {
                        this.rootStore.routerStore.navigate('master.app.main.contribution.create', {
                            id: rootStore.routerStore.routerState.params.id
                        })
                    }
                    else if (rootStore.authStore.hasPermission('theDonorsFundSection.create')) {
                        this.findDonorModalParams.open();
                    }
                    else {
                        rootStore.routerStore.navigate('master.error');
                    }
                }
            },
            actions: {
                find: async params => {
                    params.embed = 'donorAccount,coreUser,payerInformation,address,bankAccount,createdByCoreUser,paymentType,contributionStatus';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await contributionService.find(rootStore.routerStore.routerState.params.id, params);
                    return response;
                }
            },
            queryConfig: {
                filter: new ContributionListFilter()
            }
        });

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.contributionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'contribution-status');
        this.paymentTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');
        this.contributionService = contributionService;

        this.contributionEmployeeUpdate = rootStore.authStore.hasPermission('theDonorsFundSection.update');
        this.contributionEmployeeRead = rootStore.authStore.hasPermission('theDonorsFundSection.read');
        this.contributionUpdate = rootStore.authStore.hasPermission('theDonorsFundContributionSection.update');
        this.minutes = 15;

        if (this.contributionEmployeeUpdate) {
            this.minutes = null;
        }

        this.permissions = {
            update: this.contributionUpdate || this.contributionEmployeeUpdate,
        }

        this.selectedExportColumnsName = ['Amount'];
        if (this.contributionEmployeeRead) {
            this.selectedExportColumnsName.push('Payment Type');
        }
        this.additionalExportColumnsName = ['Payer Name', 'Status', 'Created By', 'Date Created'];

        this.findDonorModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.reviewContributionModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.load();
    }

    @action.bound async load() {
        await this.setFilterDropdownStores();

        let availableStatuesForEdit = _.map(_.filter(this.contributionStatuses, function (x) { return x.abrv === 'pending' || x.abrv === 'in-process' }), function (o) { return o.id });
        let availableStatuesForReview = _.map(_.filter(this.contributionStatuses, function (x) { return x.abrv === 'pending' || x.abrv === 'in-process' || x.abrv === 'funded' }), function (o) { return o.id });

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'donorAccount.coreUser',
                        title: 'Donor Name',
                        permissions: { read: this.contributionEmployeeRead },
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'amount',
                        title: 'Amount'
                    },
                    {
                        key: 'confirmationNumber',
                        title: 'Conf. Number'
                    },
                    {
                        key: 'contributionStatus.name',
                        title: 'Status'
                    },
                    {
                        key: 'paymentType.name',
                        title: 'Payment Type'
                    },
                    {
                        key: 'payerInformation',
                        title: 'Payer Name',
                        permissions: { read: this.contributionEmployeeRead },
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'bankAccount.name',
                        title: 'Bank Name'
                    },
                    {
                        key: 'createdByCoreUser',
                        title: 'Created By',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'dateUpdated',
                        title: 'Date Updated',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                ],
                actions: {
                    onEdit: contribution => this.routes.edit(contribution.id, contribution.donorAccountId),
                    onReview: contribution => this.onReviewClick(contribution.id),
                    onDetails: contribution => this.routes.details(contribution.id)
                },
                actionsConfig: {
                    onEditConfig: { minutes: this.minutes, title: 'edit', permissions: this.permissions, statuses: availableStatuesForEdit },
                    onReviewConfig: { title: 'review', permissions: { update: this.contributionEmployeeUpdate }, statuses: availableStatuesForReview }
                }
            })
        );
        this.loaded = true;
    }

    @action.bound async onReviewClick(id) {
        this.reviewId = id;
        this.reviewContributionModalParams.open();
    }

    @action.bound async onAfterReviewContribution() {
        this.queryUtility._reloadCollection();
        this.reviewContributionModalParams.close();
    }

    @action.bound async onChangeSearchDonor(option) {
        if (option) {
            this.rootStore.routerStore.navigate('master.app.main.contribution.create', {
                id: option.id
            })
        }
    }

    @action.bound async setFilterDropdownStores() {
        let paymentTypeModels = await this.paymentTypeLookup.getAll();
        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Payment Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.paymentTypeIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(paymentTypeModels.data, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );

        let contributionStatusModels = await this.contributionStatusLookup.getAll();
        this.contributionStatuses = contributionStatusModels.data;
        this.contributionStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Contribution Status',
                textField: 'name',
                dataItemKey: 'id',
                clearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.contributionStatusIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.contributionStatuses, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );

        this.donorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Donor',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onDonorFilterSearch
            }
        );
    }


    @action.bound async onDonorFilterSearch(option) {
        this.queryUtility.filter.donorAccountId = (option ? option.id : null)
    }
}

export default ContributionListViewStore;