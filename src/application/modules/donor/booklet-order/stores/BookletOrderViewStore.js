import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { BookletOrderListFilter } from 'application/donor/booklet-order/models';

class BookletOrderViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet-order',
            authorization: 'theDonorsFundBookletOrderSection',
            routes: {
                create: () => {
                    this.rootStore.routerStore.goTo('master.app.main.donor.booklet-order.create');
                }
            },
            queryConfig: {
                filter: new BookletOrderListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.deliveryMethodTypeDropdownStore.setValue(null);
                    this.bookletOrderStatusDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                    this.searchDonorDropdownStore.setValue(null);
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
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {}
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
