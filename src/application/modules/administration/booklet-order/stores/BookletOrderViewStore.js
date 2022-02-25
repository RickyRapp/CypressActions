import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { BookletOrderListFilter } from 'application/administration/booklet-order/models';
import moment from 'moment';
class BookletOrderViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet-order',
            authorization: 'theDonorsFundBookletOrderSection',
            routes: {
                create: () => {
                    this.openSelectDonorModal();
                },
                review: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.booklet-order.review', { id: id });
                },
                details: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.booklet-order.details', { id: id });
                },
                edit: (id) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.booklet-order.edit', { id: id });
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
                        if(params.dateCreatedFrom)
                            params.dateCreatedFrom = `${params.dateCreatedFrom} 00:00:00`;
                        if(params.dateCreatedTo)
                            params.dateCreatedTo = `${params.dateCreatedTo} 23:59:59`;
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
                        return this.rootStore.application.administration.bookletOrderStore.findBookletOrder(params);
                    }
                }
            }
        });

        this.createTableStore()
        this.createDonorSearchDropdownStore();
        this.createSelectDonorModal();
        this.createBookletOrderStatusDropdownStore();
        this.createDeliveryMethodTypeDropdownStore();
        this.createDateCreatedDateRangeQueryStore();
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.queryUtility.filter.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.booklet-order.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.booklet-order.create', { id: donorId })
            });
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'BOOKLET_ORDER.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true
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
                onReview: (bookletOrderId) => this.routes.review(bookletOrderId),
                onDetails: (bookletOrderId) => this.routes.details(bookletOrderId),
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onCancel: async (item) => await this.cancelBookletOrder(item.id),
                onEdit: (item) => this.routes.edit(item.id)
            },
            actionsRender: {
                onReviewRender: (item) => {
                    return item.bookletOrderStatus.abrv === 'pending';
                },
                onDetailsRender: (item) => {
                    return item.bookletOrderStatus.abrv === 'finished';
                },
                onCancelRender: (item) => {
                    const dateFromEnabled = (new Date(2022, 1, 25)).toISOString(); 
                    const moment1 = moment(item.dateCreated);
                    const moment2 = moment(dateFromEnabled);

                    return item.bookletOrderStatus.abrv === 'pending' && (moment1.isAfter(moment2))
                },
                onEditRender: (item) => {
                    const dateFromEnabled = (new Date(2022, 1, 25)).toISOString(); 
                    const moment1 = moment(item.dateCreated);
                    const moment2 = moment(dateFromEnabled);

                    return item.bookletOrderStatus.abrv === 'pending' && (moment1.isAfter(moment2))
                }
            }
        }));
    }
    
    @action.bound
    async cancelBookletOrder(id) {
        await this.rootStore.application.administration.bookletOrderStore.cancelBookletOrder({id: id});
        this.queryUtility.fetch();
    }

    createDonorSearchDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'BOOKLET_ORDER.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: true,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.donorStore.searchDonor({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses',
                        ]
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (this.rootStore.routerStore.routerState.queryParams && this.rootStore.routerStore.routerState.queryParams.donorId) {
                        const id = this.rootStore.routerStore.routerState.queryParams.donorId;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'securityPin',
                                'donorAddresses',
                            ]
                        }
                        const data = await this.rootStore.application.administration.donorStore.getDonor(id, params);
                        return { id: data.id, name: donorFormatter.format(data, { type: 'donor-name', value: 'dropdown' }) };
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorId) => {
                    this.queryUtility.filter.donorId = donorId;
                }
            });
    }

    createSelectDonorModal() {
        this.selectDonorModal = new ModalParams({});
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
