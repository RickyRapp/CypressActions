import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { BookletOrderListFilter } from 'application/administration/booklet-order/models';
import moment from 'moment';
import { saveAs } from '@progress/kendo-file-saver';
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
                        if(params.dateCreatedFrom){
                            let fromDate = params.dateCreatedFrom.replace(' 00:00:00','');
                            params.dateCreatedFrom = `${fromDate} 00:00:00`;
                        }
                        if(params.dateCreatedTo){
                            let toDate = params.dateCreatedTo.replace(' 23:59:59','');
                            params.dateCreatedTo = `${toDate} 23:59:59`;
                        }
                        params.embed = [
                            'donor',
                            'bookletOrderStatus',
                            'deliveryMethodType'
                        ];

                        params.fields = [
                            'id',
                            'donorId',
                            'dateCreated',
                            'amount',
                            'confirmationNumber',
                            'bookletOrderStatus',
                            'donor',
                            'donor.donorName',
                            'deliveryMethodType',
                            'customName',
                            'orderFolder',
                            'isCustom',,
                            'isCustomized'
                        ];
                        return this.rootStore.application.administration.bookletOrderStore.findBookletOrder(params);
                    }
                }
            }
        });
        this.mailModel = {
            sendTo: ''
        }
        this.createTableStore()
        this.createDonorSearchDropdownStore();
        this.createSelectDonorModal();
        this.createBookletOrderStatusDropdownStore();
        this.createDeliveryMethodTypeDropdownStore();
        this.createDateCreatedDateRangeQueryStore();
        this.queryUtility.filter.orderFolder = false;
        this.queryUtility.filter.isCustom = false;
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
                    const dateFromEnabled = (new Date(2022, 1, 27)).toISOString(); 
                    const moment1 = moment(item.dateCreated);
                    const moment2 = moment(dateFromEnabled);

                    return item.bookletOrderStatus.abrv === 'pending' && (moment1.isAfter(moment2))
                },
                onEditRender: (item) => {
                    const dateFromEnabled = (new Date(2022, 1, 27)).toISOString(); 
                    const moment1 = moment(item.dateCreated);
                    const moment2 = moment(dateFromEnabled);

                    return item.bookletOrderStatus.abrv === 'pending' && (moment1.isAfter(moment2))
                }
            }
        }, true));
    }
    @action.bound 
    async selectDefaults() {
        this.queryUtility.filter.sendTo = 'jscoza@checkprintingsolutions.com'
        const filteredDefaults = this.tableStore.data.filter(x => x.customName && x.bookletOrderStatus && x.bookletOrderStatus.abrv == 'pending');
        this.tableStore.setSelectedItems(filteredDefaults);
    }
    @action.bound
    async exportList(sendMail = false) {
        if(this.tableStore.selectedItems.length == 0) {
            this.rootStore.notificationStore.warning("No items selected!");
            return;
        }
        if(this.tableStore.selectedItems.filter(x => x.bookletOrderStatus.abrv == 'finished').length > 0) {
            this.rootStore.notificationStore.warning("You can only choose pending items!");
            return;
        }
        this.tableStore.suspend();
        if(sendMail) {
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!this.queryUtility.filter.sendTo.match(validRegex)) {
                this.rootStore.notificationStore.error("Invalid mail format!");
                return;
            }
        }
        const contentType = 'text/csv';
        const extension = 'csv'
        const report = await this.rootStore.application.administration.bookletOrderStore.generateReport({ contentType, ids: this.tableStore.selectedItems.map(x => { return x.id }), sendTo: this.queryUtility.filter.sendTo});
        const nowDate = new Date();
        const fileName = `${"BookletOrders".split(' ').join('_')}_${nowDate.getFullYear()}_${nowDate.getMonth()}_${nowDate.getDay()}_${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}_${nowDate.getMilliseconds()}.${extension}`;
        saveAs(report.data, fileName);
        this.tableStore.resume();
        this.queryUtility.fetch();
        this.rootStore.notificationStore.success("Report generated.");
        
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
