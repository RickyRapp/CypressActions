import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { BookletOrderListFilter } from 'application/donor/booklet-order/models';
import moment from 'moment';

class BookletOrderViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet-order',
            authorization: 'theDonorsFundBookletOrderSection',
            routes: {
                create: () => {
                    this.rootStore.routerStore.goTo('master.app.main.donor.booklet-order.create');
                },
                details: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.donor.booklet-order.details', { id: id });
                }
            },
            queryConfig: {
                filter: new BookletOrderListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.deliveryMethodTypeDropdownStore.setValue(null);
                    this.bookletOrderStatusDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'bookletOrderStatus'
                        ];

                        params.fields = [
                            'id',
                            'donorId',
                            'dateCreated',
                            'amount',
                            'confirmationNumber',
                            'bookletOrderStatus'
                        ];
                        return this.rootStore.application.donor.bookletOrderStore.findBookletOrder({ donorId: this.donorId, ...params });
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;

        this.createTableStore()
        this.createBookletOrderStatusDropdownStore();
        this.createDeliveryMethodTypeDropdownStore();
        this.createDateCreatedDateRangeQueryStore();
    }

    async cancelBookletOrder(id) {
        await this.rootStore.application.administration.bookletOrderStore.cancelBookletOrder({id: id});
        this.queryUtility.fetch();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
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
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onDetails: (bookletOrderId) => this.routes.details(bookletOrderId),
                onCancel: async (item) => await this.cancelBookletOrder(item.id),
            },
            actionsRender: {
                onDetailsRender: (item) => {
                    return item.bookletOrderStatus.abrv === 'finished';
                },
                onEditRender: (item) => {
                    return item.bookletOrderStatus.abrv === 'pending';
                },
                onCancelRender: (item) => {
                    const dateToday = (new Date()).toISOString().slice(0, 10); 
                    const moment1 = moment(item.dateCreated);
                    const moment2 = moment(`${dateToday} 00:00:00`);
                    const moment3 = moment(`${dateToday} 16:00:00`);
                    console.log(moment1, moment2, moment3);
                    return item.bookletOrderStatus.abrv === 'pending' && (moment1.isAfter(moment2)) && moment3.isAfter(moment1)
                },
            }
        }));
        
    }

    createBookletOrderStatusDropdownStore() {
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

    createDateCreatedDateRangeQueryStore() {
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
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
}

export default BookletOrderViewStore;
