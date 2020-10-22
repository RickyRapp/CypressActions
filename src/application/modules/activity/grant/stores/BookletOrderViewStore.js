import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { BookletOrderService } from 'application/booklet-order/services';
import { ModalParams } from 'core/models';
import { BookletOrderListFilter } from 'application/activity/grant/models';
import moment from 'moment';

class BookletOrderViewStore extends BaseListViewStore {
    constructor(rootStore) {
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
                filter: new BookletOrderListFilter('dateCreated', 'desc'),
                onResetFilter: () => {
                    this.deliveryMethodTypeDropdownStore.setValue(null);
                    this.bookletOrderStatusDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                const service = new BookletOrderService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'donor',
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

                        const response = await service.find({ userId: this.donorId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;
        this.createTableStore();
        this.createBookletOrderDropdownStore()
        this.createDeliveryMethodTypeDropdownStore()
        this.selectDonorModal = new ModalParams({});
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

    createBookletOrderDropdownStore() {
        this.bookletOrderStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.bookletOrderStatusStore.find();
                },
                onChange: (bookletOrderStatus) => {
                    this.queryUtility.filter.bookletOrderStatusIds = bookletOrderStatus.map((status) => { return status.id });
                }
            });

    }
    createDeliveryMethodTypeDropdownStore() {
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.deliveryMethodTypeStore.find();
                },
                onChange: (deliveryMethodType) => {
                    this.queryUtility.filter.deliveryMethodTypeIds = deliveryMethodType.map((type) => { return type.id });
                }
            });
    }

    createTableStore() {
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
    }
}

export default BookletOrderViewStore;
