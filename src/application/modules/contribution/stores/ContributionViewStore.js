import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { ContributionService } from 'application/contribution/services';
import { DonorService } from 'application/donor/services';
import { applicationContext, donorFormatter, isSome } from 'core/utils';
import { ModalParams } from 'core/models';
import { LookupService } from 'common/services';
import { ContributionListFilter } from 'application/contribution/models';
import _ from 'lodash';
import moment from 'moment';

@applicationContext
class ContributionViewStore extends BaseListViewStore {
    @observable accountTypes = null;

    constructor(rootStore) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id;
        const queryParamsId = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') && rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.id : null;
        let filter = new ContributionListFilter('dateCreated', 'desc')
        filter.donorId = id || queryParamsId;

        super(rootStore, {
            name: 'contribution',
            authorization: 'theDonorsFundContributionSection',
            routes: {
                edit: (id, editId) => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.contribution.edit',
                        {
                            id: id,
                            editId: editId
                        }
                    );
                },
                create: () => {
                    if (this.hasPermission('theDonorsFundAdministrationSection.create')) {
                        this.openSelectDonorModal();
                    }
                    else {
                        this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: id });
                    }
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorId = id;
                    this.searchDonorDropdownStore.setValue(null);
                    this.paymentTypeDropdownStore.setValue(null);
                    this.contributionStatusDropdownStore.setValue(null);
                    this.timePeriodDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                const service = new ContributionService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'donor',
                            'donor.coreUser',
                            'donor.companyProfile',
                            'payerInformation',
                            'bankAccount',
                            'paymentType',
                            'contributionStatus'
                        ];
                        params.fields = [
                            'id',
                            'donorId',
                            'donor',
                            'donor.donorName',
                            'amount',
                            'dateCreated',
                            'confirmationNumber',
                            'contributionStatus',
                            'contributionStatus.name',
                            'contributionStatus.abrv',
                            'paymentType',
                            'paymentType.name',
                            'paymentType.abrv',
                            'payerInformation',
                            'payerInformation.name',
                            'bankAccount',
                            'bankAccount.accountNumber'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'CONTRIBUTION.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true,
                    visible: this.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'amount',
                    title: 'CONTRIBUTION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'CONTRIBUTION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                },
                {
                    key: 'contributionStatus.name',
                    title: 'CONTRIBUTION.LIST.COLUMNS.CONTRIBUTION_STATUS_NAME_LABEL',
                },
                {
                    key: 'paymentType.name',
                    title: 'CONTRIBUTION.LIST.COLUMNS.PAYMENT_TYPE_NAME_LABEL',
                    format: {
                        type: 'function',
                        value: this.renderPaymentType
                    }
                },
                {
                    key: 'payerInformation.name',
                    title: 'CONTRIBUTION.LIST.COLUMNS.PAYER_INFORMATION_NAME_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'CONTRIBUTION.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (contribution) => this.routes.edit(contribution.donorId, contribution.id),
                onReview: (contributionId) => this.openReviewDonorModal(contributionId),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (item) => {
                    if (item.contributionStatus.abrv === 'pending' || item.contributionStatus.abrv === 'in-process') {
                        if (this.hasPermission('theDonorsFundAdministrationSection.update')) {
                            return true;
                        }
                        else {
                            if (item.contributionStatus.abrv === 'pending') {
                                const dateToEdit = moment(item.dateCreated).add('minutes', 15);
                                return moment().isBetween(item.dateCreated, dateToEdit);
                            }
                        }
                    }
                    return false;
                },
                onReviewRender: (item) => {
                    return true;//item.confirmationNumber > 20000 // import from old app
                }
            }
        }));

        this.selectDonorModal = new ModalParams({});
        this.reviewModal = new ModalParams({});

        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'CONTRIBUTION.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id) {
                        const id = rootStore.routerStore.routerState.queryParams.id;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'securityPin',
                                'donorAddresses'
                            ]
                        }
                        const response = await donorService.get(id, params);
                        rootStore.routerStore.setQueryParams(null);
                        return { id: response.data.id, name: response.data.donorName };
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorId) => {
                    this.queryUtility.filter['donorId'] = donorId;
                }
            });

        this.paymentTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'payment-type');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (paymentType) => {
                    this.queryUtility.filter['paymentTypeIds'] = _.map(paymentType, (type) => { return type.id });
                }
            });
        this.contributionStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'contribution-status');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (contributionStatus) => {
                    this.queryUtility.filter['contributionStatusIds'] = _.map(contributionStatus, (status) => { return status.id });
                }
            });
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
        this.timePeriodDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const timePeriods =
                        [
                            {
                                id: 0,
                                name: 'This week'
                            },
                            {
                                id: 1,
                                name: 'This month'
                            },
                            {
                                id: 2,
                                name: 'Last week'
                            },
                            {
                                id: 3,
                                name: 'Last month'
                            }
                        ]
                    return timePeriods;
                },
                onChange: (item) => {
                    if (isSome(item)) {
                        const currentDate = new Date();
                        const now_utc = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 0, 0, 0);
                        if (item === 0) {
                            const thisWeekFirstDate = moment(new Date(now_utc)).startOf('week').toDate();
                            const thisWeekLastDate = moment(new Date(now_utc)).endOf('week').toDate();
                            this.dateCreatedDateRangeQueryStore.setValue({ start: thisWeekFirstDate, end: thisWeekLastDate });
                            this.queryUtility.filter['dateCreatedFrom'] = moment(thisWeekFirstDate).format('YYYY-MM-DD');
                            this.queryUtility.filter['dateCreatedTo'] = moment(thisWeekLastDate).format('YYYY-MM-DD');
                        }
                        else if (item === 1) {
                            const thisMonthFirstDate = moment(new Date(now_utc)).startOf('month').toDate();
                            const thisMonthLastDate = moment(new Date(now_utc)).endOf('month').toDate();
                            this.dateCreatedDateRangeQueryStore.setValue({ start: thisMonthFirstDate, end: thisMonthLastDate });
                            this.queryUtility.filter['dateCreatedFrom'] = moment(thisMonthFirstDate).format('YYYY-MM-DD');
                            this.queryUtility.filter['dateCreatedTo'] = moment(thisMonthLastDate).format('YYYY-MM-DD');
                        }
                        else if (item === 2) {
                            const lastWeekFirstDate = moment(new Date(now_utc)).add(-7, 'days').startOf('week').toDate();
                            const lastWeekLastDate = moment(new Date(now_utc)).add(-7, 'days').endOf('week').toDate();
                            this.dateCreatedDateRangeQueryStore.setValue({ start: lastWeekFirstDate, end: lastWeekLastDate });
                            this.queryUtility.filter['dateCreatedFrom'] = moment(lastWeekFirstDate).format('YYYY-MM-DD');
                            this.queryUtility.filter['dateCreatedTo'] = moment(lastWeekLastDate).format('YYYY-MM-DD');
                        }
                        else if (item === 3) {
                            const lastMonthFirstDate = moment(new Date(now_utc)).add(-1, 'months').startOf('month').toDate();
                            const lastMonthLastDate = moment(new Date(now_utc)).add(-1, 'months').endOf('month').toDate();
                            this.dateCreatedDateRangeQueryStore.setValue({ start: lastMonthFirstDate, end: lastMonthLastDate });
                            this.queryUtility.filter['dateCreatedFrom'] = moment(lastMonthFirstDate).format('YYYY-MM-DD');
                            this.queryUtility.filter['dateCreatedTo'] = moment(lastMonthLastDate).format('YYYY-MM-DD');
                        }
                    }
                }
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchAccountTypes()
            ]);
        }
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.queryUtility.filter.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: donorId })
            }
        );
    }

    @action.bound
    onClickDonorFromFilter(donorId) {
        this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: donorId })
    }

    @action.bound
    openReviewDonorModal(id) {
        this.reviewModal.open({
            id: id,
            onAfterReview: () => { this.reviewModal.close(); this.queryUtility.fetch(); }
        });
    }

    @action.bound
    renderPaymentType(item) {
        if (item.paymentType.abrv === 'ach' || item.paymentType.abrv === 'wire-transfer') {
            if (item.bankAccount) {
                if (item.bankAccount.accountNumber.length > 4) {
                    return `${item.paymentType.name}${' ...' + item.bankAccount.accountNumber.substr(item.bankAccount.accountNumber.length - 4)}`;
                }
                else {
                    return `${item.paymentType.name}${' ...' + item.bankAccount.accountNumber}`;
                }
            }
        }
        return item.paymentType.name;
    }

    @action.bound
    async fetchAccountTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'account-type');
        const response = await service.getAll();
        this.accountTypes = response.data;
    }
}

export default ContributionViewStore;
