import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { BookletOrderService } from 'application/booklet-order/services';
import { DonorService } from 'application/donor/services';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { LookupService } from 'common/services';
import { BookletOrderListFilter } from 'application/booklet-order/models';
import _ from 'lodash';
import moment from 'moment';

class BookletOrderViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const filter = new BookletOrderListFilter('dateCreated', 'desc')
        if (rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
            if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.donorId) {
                filter.donorId = rootStore.routerStore.routerState.queryParams.donorId;
            }
        }

        super(rootStore, {
            name: 'booklet-order',
            authorization: 'theDonorsFundBookletOrderSection',
            routes: {
                edit: (id, editId) => {
                    this.rootStore.routerStore.goTo('master.app.main.booklet-order.edit', { id: id, editId: editId });
                },
                create: () => {
                    if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
                        this.openSelectDonorModal();
                    }
                    else {
                        this.rootStore.routerStore.goTo('master.app.main.booklet-order.create');
                    }
                },
                review: (id) => {
                    if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
                        this.rootStore.routerStore.goTo('master.app.main.booklet-order.review', { id: id });
                    }
                }
            },
            queryConfig: {
                filter: filter,
                onResetFilter: () => {
                    this.deliveryMethodTypeDropdownStore.setValue(null);
                    this.bookletOrderStatusDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                    this.searchDonorDropdownStore.setValue(null);
                }
            },
            actions: () => {
                const service = new BookletOrderService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'donor',
                            'createdByCoreUser',
                            'bookletOrderStatus'
                        ];

                        params.fields = [
                            'id',
                            'donorId',
                            'dateCreated',
                            'amount',
                            'confirmationNumber',
                            'bookletOrderStatus',
                            'donor',
                            'donor.donorName'
                        ];

                        let userId = null;
                        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
                            userId = rootStore.userStore.user.id
                        }

                        const response = await service.find({ userId: userId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true,
                    visible: this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'dateCreated',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL'
                },
                {
                    key: 'amount',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'bookletOrderStatus.name',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.STATUS_LABEL',
                }
            ],
            actions: {
                onEdit: (bookletOrder) => this.routes.edit(bookletOrder.donorId, bookletOrder.id),
                onReview: (bookletOrderId) => this.routes.review(bookletOrderId),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (bookletOrder) => {
                    if (bookletOrder.bookletOrderStatus.abrv === 'pending') {
                        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
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
                        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
                            return true;
                        }
                    }
                    return false;
                }
            }
        }));

        this.selectDonorModal = new ModalParams({});

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
                    this.queryUtility.filter.donorId = donorId;
                }
            });

        this.bookletOrderStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'booklet-order-status');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (bookletOrderStatus) => {
                    this.queryUtility.filter['bookletOrderStatusIds'] = _.map(bookletOrderStatus, (status) => { return status.id });
                }
            });
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (deliveryMethodType) => {
                    this.queryUtility.filter['deliveryMethodTypeIds'] = _.map(deliveryMethodType, (type) => { return type.id });
                }
            });
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.queryUtility.filter.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.booklet-order.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.booklet-order.create', { id: donorId })
            });
    }
}

export default BookletOrderViewStore;
