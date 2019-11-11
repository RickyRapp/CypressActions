import { action, runInAction } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { BookletOrderService } from 'application/booklet-order/services';
import { DonorAccountService } from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { LookupService } from 'common/services';
import { BookletOrderListFilter } from 'application/booklet-order/models';
import _ from 'lodash';
import moment from 'moment';

@applicationContext
class BookletOrderViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id
        let filter = new BookletOrderListFilter('dateCreated', 'desc')
        filter.donorAccountId = id;

        super(rootStore, {
            name: 'booklet-order',
            authorization: 'theDonorsFundBookletOrderSection',
            routes: {
                edit: (id, editId) => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.booklet-order.edit',
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
                        this.rootStore.routerStore.goTo('master.app.main.booklet-order.create', { id: id });
                    }
                },
                review: (id) => {
                    if (this.hasPermission('theDonorsFundAdministrationSection.create')) {
                        this.rootStore.routerStore.goTo('master.app.main.booklet-order.review', { id: id });
                    }
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorAccountId = id;
                    this.deliveryMethodTypeDropdownStore.setValue(null);
                    this.bookletOrderStatusDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                    this.searchDonorAccountDropdownStore.setValue(null);
                }
            },
            actions: () => {
                const service = new BookletOrderService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'donorAccount',
                            'donorAccount.coreUser',
                            'donorAccount.companyProfile',
                            'createdByCoreUser',
                            'bookletOrderStatus'
                        ];

                        params.fields = [
                            'id',
                            'donorAccountId',
                            'dateCreated',
                            'amount',
                            'confirmationNumber',
                            'bookletOrderStatus',
                            'donorAccount',
                            'donorAccount.donorName',
                            'createdByCoreUser',
                            'createdByCoreUser.firstName'
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
                    key: 'donorAccount.donorName',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true,
                    visible: this.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'confirmationNumber',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL'
                },
                {
                    key: 'bookletOrderStatus.name',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.STATUS_LABEL',
                },
                {
                    key: 'createdByCoreUser.firstName',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.CREATED_BY_LABEL'
                },
                {
                    key: 'dateCreated',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (bookletOrder) => this.routes.edit(bookletOrder.donorAccountId, bookletOrder.id),
                onReview: (bookletOrderId) => this.routes.review(bookletOrderId),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (bookletOrder) => {
                    if (bookletOrder.bookletOrderStatus.abrv === 'pending') {
                        if (this.hasPermission('theDonorsFundAdministrationSection.update')) {
                            return true;
                        }
                        else {
                            if (bookletOrder.bookletOrderStatus.abrv === 'pending') {
                                const dateToEdit = moment(bookletOrder.dateCreated).add('minutes', 15);
                                return moment().isBetween(bookletOrder.dateCreated, dateToEdit);
                            }
                        }
                    }
                    return false;
                },
                onReviewRender: (bookletOrder) => {
                    if (bookletOrder.bookletOrderStatus.abrv === 'pending') {
                        if (this.hasPermission('theDonorsFundAdministrationSection.update')) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        }));

        this.selectDonorModal = new ModalParams({});

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.selectDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'BOOKLET_ORDER.LIST.SELECT_DONOR',
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
                    this.rootStore.routerStore.goTo('master.app.main.booklet-order.create', { id: donorAccountId })
                }
            });

        this.searchDonorAccountDropdownStore = new BaasicDropdownStore({
            placeholder: 'CONTRIBUTION.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
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
                    this.queryUtility.filter['donorAccountId'] = donorAccountId;
                }
            });

        this.bookletOrderStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                onChange: (bookletOrderStatus) => {
                    this.queryUtility.filter['bookletOrderStatusIds'] = _.map(bookletOrderStatus, (status) => { return status.id });
                }
            });
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                onChange: (deliveryMethodType) => {
                    this.queryUtility.filter['deliveryMethodTypeIds'] = _.map(deliveryMethodType, (type) => { return type.id });
                }
            });
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }


    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchBookletStatuses(),
                this.fetchDeliveryMethodTypes()
            ]);
        }
    }

    @action.bound
    async fetchBookletStatuses() {
        this.bookletOrderStatusDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'booklet-order-status');
        const response = await service.getAll();
        runInAction(() => {
            this.bookletOrderStatusDropdownStore.setItems(response.data);
            this.bookletOrderStatusDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchDeliveryMethodTypes() {
        this.deliveryMethodTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
        const response = await service.getAll();
        runInAction(() => {
            this.deliveryMethodTypeDropdownStore.setItems(response.data);
            this.deliveryMethodTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open({ donorAccountId: this.queryUtility.filter.donorAccountId });
    }
}

export default BookletOrderViewStore;
