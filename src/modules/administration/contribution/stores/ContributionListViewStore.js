import { action, observable } from 'mobx';
import { ContributionService, LookupService, DonorAccountService } from "common/data";
import { ContributionListFilter } from 'modules/administration/contribution/models';
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import { getDonorNameDropdown } from 'core/utils';
import _ from 'lodash';

class ContributionListViewStore extends BaseListViewStore {
    paymentTypeDropdownStore = null;
    contributionStatusDropdownStore = null;
    contributionStatuses = null;
    paymentTypeModels = null;
    @observable loaded = false;
    @observable contributionId = null;
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);

        let filter = new ContributionListFilter();
        filter.donorAccountId = rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.donorAccountId : null;

        super(rootStore, {
            name: 'contribution',
            routes: {
                edit: (contributionId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.contribution.edit', {
                        id: contributionId,
                    }),
                create: () => {
                    this.findDonorModalParams.open();
                }
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'donorAccount,coreUser,payerInformation,address,bankAccount,createdByCoreUser,paymentType,contributionStatus';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await contributionService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        });

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.contributionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'contribution-status');
        this.paymentTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');
        this.contributionService = contributionService;

        this.selectedExportColumnsName = ['Amount', 'Payment Type'];
        this.additionalExportColumnsName = ['Payer Name', 'Status', 'Created By', 'Date Created'];

        this.findDonorModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.reviewContributionModalParams = new ModalParams({
            onClose: () => { this.contributionId = null; this.onClose }
        });

        this.detailsContributionModalParams = new ModalParams({
            onClose: () => { this.contributionId = null; this.onClose },
            notifyOutsideClick: true
        });

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setFilterDropdownStores();

        let availableStatuesForEdit = _.map(_.filter(this.contributionStatuses, function (x) { return x.abrv === 'pending' || x.abrv === 'in-process' }), function (o) { return o.id });
        let availableStatuesForReview = _.map(_.filter(this.contributionStatuses, function (x) { return x.abrv === 'pending' || x.abrv === 'in-process' || x.abrv === 'funded' }), function (o) { return o.id });

        const renderPaymentType = (item) => {
            if (item.paymentTypeId === _.find(this.paymentTypeModels, { abrv: 'ach' }).id || item.paymentTypeId === _.find(this.paymentTypeModels, { abrv: 'wire-transfer' }).id) {
                return `${_.find(this.paymentTypeModels, { id: item.paymentTypeId }).name}${item.bankAccount !== null ? ' ...' + item.bankAccount.accountNumber : ''}`;
            }
            else
                return _.find(this.paymentTypeModels, { id: item.paymentTypeId }).name;
        }

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'donorAccount.coreUser',
                        title: 'Donor Name',
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
                        title: 'Amount',
                        type: 'currency'
                    },
                    {
                        key: 'confirmationNumber',
                        title: 'Conf. Number'
                    },
                    {
                        key: 'contributionStatusId',
                        title: 'Status',
                        type: 'lookup',
                        lookup: this.contributionStatuses
                    },
                    {
                        key: 'paymentTypeId',
                        title: 'Payment Type',
                        type: 'function',
                        function: renderPaymentType
                    },
                    {
                        key: 'payerInformation',
                        title: 'Payer Name',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'createdByCoreUser',
                        title: 'Created By',
                        type: 'object',
                        separator: ' ',
                        defaultValue: 'System',
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
                    onEdit: contribution => this.routes.edit(contribution.id),
                    onReview: contribution => { this.contributionId = contribution.id; this.reviewContributionModalParams.open(); },
                    onDetails: contribution => { this.contributionId = contribution.id; this.detailsContributionModalParams.open(); }
                },
                actionsConfig: {
                    onEditConfig: { statuses: availableStatuesForEdit },
                    onReviewConfig: { statuses: availableStatuesForReview }
                }
            })
        );

        this.loaded = true;
    }

    @action.bound async onAfterReviewContribution() {
        this.queryUtility._reloadCollection();
        this.reviewContributionModalParams.close();
        this.contributionId = null;
    }

    @action.bound async onChangeSearchDonor(option) {
        if (option) {
            this.rootStore.routerStore.navigate('master.app.administration.contribution.create', {
                userId: option.id
            })
        }
    }

    @action.bound async loadLookups() {
        let paymentTypeModels = await this.paymentTypeLookup.getAll();
        this.paymentTypeModels = paymentTypeModels.data;

        let contributionStatusModels = await this.contributionStatusLookup.getAll();
        this.contributionStatuses = contributionStatusModels.data;
    }

    @action.bound async setFilterDropdownStores() {
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
            _.map(_.orderBy(this.paymentTypeModels, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );

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

        if (this.queryUtility.filter.donorAccountId) {
            let params = {};
            params.embed = ['coreUser,donorAccountAddresses,address'];
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }


    @action.bound async onDonorFilterSearch(option) {
        this.queryUtility.filter.donorAccountId = (option ? option.id : null)
    }
}


export default ContributionListViewStore;