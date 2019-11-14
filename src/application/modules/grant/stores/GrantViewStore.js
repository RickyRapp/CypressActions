import { action, runInAction } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { GrantService } from 'application/grant/services';
import { DonorAccountService } from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantListFilter } from 'application/grant/models';
import { LookupService } from 'common/services';
import moment from 'moment'
import _ from 'lodash';

@applicationContext
class GrantViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id;
        const queryParamsId = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') && rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.id : null;
        let filter = new GrantListFilter('dateCreated', 'desc')
        filter.donorAccountId = id || queryParamsId;

        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundGrantSection',
            routes: {
                edit: (id, editId) => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.grant.edit',
                        {
                            id: id,
                            editId: editId
                        }
                    );
                },
                scheduledGrantsList: (name) => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.scheduled-grant.list', null,
                        {
                            name: name
                        }
                    );
                },
                create: () => {
                    if (this.hasPermission('theDonorsFundAdministrationSection.create')) {
                        this.openSelectDonorModal();
                    }
                    else {
                        this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: id });
                    }
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorAccountId = id;
                    this.grantStatusDropdownStore.setValue(null);
                    this.searchDonorAccountDropdownStore.setValue(null);
                }
            },
            actions: () => {
                const service = new GrantService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'donation',
                            'donation.donationStatus',
                            'donation.charity',
                            'grantPurposeType',
                            'createdByCoreUser',
                            'donorAccount',
                            'donorAccount.coreUser',
                            'donorAccount.companyProfile',
                            'grantStatus',
                            'grantScheduledPayment'
                        ];
                        params.fields = [
                            'id',
                            'donation',
                            'donation.charity',
                            'donation.charity.name',
                            'donorAccount',
                            'donorAccount.id',
                            'donorAccount.donorName',
                            'amount',
                            'confirmationNumber',
                            'grantStatus',
                            'grantPurposeType',
                            'dateCreated',
                            'scheduledGrantPayment'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.rootStore = rootStore;

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donorAccount.donorName',
                    title: 'GRANT.LIST.COLUMNS.DONOR_NAME_LABEL',
                    visible: this.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'donation.charity.name',
                    title: 'GRANT.LIST.COLUMNS.DONATION_CHARITY_LABEL',
                },
                {
                    key: 'amount',
                    title: 'GRANT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'GRANT.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                },
                {
                    key: 'grantStatus.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_STATUS_NAME_LABEL',
                },
                {
                    key: 'grantPurposeType.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_PURPOSE_TYPE_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (grant) => this.routes.edit(grant.donorAccount.id, grant.id),
                onRedirect: (grant) => this.routes.scheduledGrantsList(grant.scheduledGrantPayment.name),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (grant) => {
                    if (this.hasPermission('theDonorsFundAdministrationSection.update')) {
                        return true;
                    }
                    else {
                        const dateToEdit = moment(grant.dateCreated).add('minutes', 15);
                        return moment().isBetween(grant.dateCreated, dateToEdit);
                    }
                },
                onRedirectRender: (grant) => {
                    if (grant.scheduledGrantPayment) {
                        return true;
                    }
                    return false;
                },
            }
        }));

        this.selectDonorModal = new ModalParams({});
        this.reviewModal = new ModalParams({});

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.selectDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.SELECT_DONOR',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorAccountService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'coreUser',
                            'companyProfile',
                            'donorAccountAddresses',
                            'donorAccountAddresses.address'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.donorName } });
                },
                onChange: (donorAccountId) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorAccountId })
                }
            });

        this.searchDonorAccountDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorAccountService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'coreUser',
                            'companyProfile',
                            'donorAccountAddresses',
                            'donorAccountAddresses.address'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.donorName } });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id) {
                        const id = rootStore.routerStore.routerState.queryParams.id;
                        const params = {
                            embed: [
                                'coreUser',
                                'companyProfile',
                                'donorAccountAddresses',
                                'donorAccountAddresses.address'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName'
                            ]
                        }
                        const response = await donorAccountService.get(id, params);
                        rootStore.routerStore.setQueryParams(null);
                        return { id: response.data.id, name: response.data.donorName };
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorAccountId) => {
                    this.queryUtility.filter['donorAccountId'] = donorAccountId;
                }
            });

        this.grantStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                onChange: (grantStatus) => {
                    this.queryUtility.filter['grantStatusIds'] = _.map(grantStatus, (status) => { return status.id });
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
                this.fetchGrantStatus()
            ]);
        }
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open({ donorAccountId: this.queryUtility.filter.donorAccountId });
    }

    @action.bound
    onClickDonorFromFilter(donorAccountId) {
        this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorAccountId })
    }

    @action.bound
    openReviewDonorModal(id) {
        this.reviewModal.open({
            id: id,
            onAfterReview: () => { this.reviewModal.close(); this.queryUtility.fetch(); }
        });
    }

    @action.bound
    async fetchGrantStatus() {
        this.grantStatusDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-status');
        const response = await service.getAll();
        runInAction(() => {
            this.grantStatusDropdownStore.setItems(response.data);
            this.grantStatusDropdownStore.setLoading(false);
        });
    }
}

export default GrantViewStore;
