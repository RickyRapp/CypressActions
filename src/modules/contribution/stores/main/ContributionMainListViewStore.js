import { action, observable } from 'mobx';
import { ContributionService, LookupService, DonorAccountService } from "common/data";
import { ContributionMainListFilter } from 'modules/contribution/models';
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import _ from 'lodash';

class ContributionMainListViewStore extends BaseListViewStore {
    paymentTypeDropdownStore = null;
    contributionStatusDropdownStore = null;
    contributionStatuses = null;
    paymentTypeModels = null;
    @observable loaded = false;

    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);

        let filter = new ContributionMainListFilter(rootStore);

        super(rootStore, {
            name: 'contribution',
            routes: {
                edit: (contributionId, userId) =>
                    this.rootStore.routerStore.navigate('master.app.main.contribution.edit', {
                        id: contributionId,
                        userId: userId
                    }),
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.main.contribution.create', {
                        userId: rootStore.authStore.user.id
                    })
                },
                details: (contributionId, userId) =>
                    this.rootStore.routerStore.navigate('master.app.main.contribution.details', {
                        id: contributionId,
                        userId: userId
                    }),
            },
            actions: {
                find: async params => {
                    params.embed = 'coreUser,payerInformation,address,bankAccount,createdByCoreUser,paymentType,contributionStatus';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await contributionService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        });

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.contributionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'contribution-status');
        this.paymentTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');
        this.contributionService = contributionService;

        this.minutes = 15;

        this.selectedExportColumnsName = ['Amount'];
        this.additionalExportColumnsName = ['Payer Name', 'Status', 'Created By', 'Date Created'];

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setFilterDropdownStores();

        let availableStatuesForEdit = _.map(_.filter(this.contributionStatuses, function (x) { return x.abrv === 'pending' || x.abrv === 'in-process' }), function (o) { return o.id });

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'amount',
                        title: 'Amount'
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
                        type: 'lookup',
                        lookup: this.paymentTypeModels
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
                    onEdit: contribution => this.routes.edit(contribution.id, contribution.donorAccountId),
                    onDetails: contribution => this.routes.details(contribution.id, contribution.donorAccountId)
                },
                actionsConfig: {
                    onEditConfig: { minutes: this.minutes, title: 'edit', permissions: this.permissions, statuses: availableStatuesForEdit },
                }
            })
        );

        this.loaded = true;
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
    }
}

export default ContributionMainListViewStore;