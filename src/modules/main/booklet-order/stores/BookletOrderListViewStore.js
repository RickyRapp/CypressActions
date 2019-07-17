import { observable, action } from 'mobx';
import { BookletOrderService } from "common/data";
import { BookletOrderListFilter } from 'modules/main/booklet-order/models';
import { BaseBookletOrderListViewStore } from 'modules/common/booklet-order/stores';
import moment from 'moment';
import _ from 'lodash';

class BookletOrderListViewStore extends BaseBookletOrderListViewStore {
    @observable donorAccountSearchDropdownStore = null;

    additionalFields = [
        'donorAccount',
        'donorAccount.donorName'
    ];

    constructor(rootStore) {
        const bookletOrderService = new BookletOrderService(rootStore.app.baasic.apiClient);

        let filter = new BookletOrderListFilter();
        filter.donorAccountId = rootStore.authStore.user.id;

        const listViewStore = {
            routes: {
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.main.booklet-order.create')
                },
                edit: (bookletOrderId) =>
                    this.rootStore.routerStore.navigate('master.app.main.booklet-order.edit', {
                        id: bookletOrderId
                    }),
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'donorAccount,donorAccount.coreUser,donorAccount.companyProfile,createdByCoreUser';
                    params.fields = _.union(this.fields, this.additionalFields);
                    const response = await bookletOrderService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        }

        const config = {
            listViewStore: listViewStore,
            setSelectedExportColumnsName: [],
            setAdditionalExportColumnsName: []
        }

        super(rootStore, config);

        this.setColumns = [
            {
                key: 'amount',
                title: 'AMOUNT',
                type: 'currency',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'confirmationNumber',
                title: 'CONFIRMATIONNUMBER',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'bookletOrderStatusId',
                title: 'STATUS',
                type: 'function',
                function: (item) => _.find(this.bookletOrderStatuses, { id: item.bookletOrderStatusId }).name,
                // onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'createdByCoreUser',
                title: 'BY',
                type: 'function',
                function: (item) => item.createdByCoreUser ?
                    (item.createdByCoreUser.userId === item.donorAccountId ? item.donorAccount.donorName : `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}`)
                    :
                    'System'
            },
            {
                key: 'dateUpdated',
                title: 'DATEUPDATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
        ];

        this.setActions = {
            onReview: (bookletOrder) => { this.bookletOrderId = bookletOrder.id; this.reviewModalParams.open(); },
            onEdit: (bookletOrder) => this.routes.edit(bookletOrder.id)
        }

        this.setRenderActions = {
            renderReview: this.renderReview,
            renderEdit: this.renderEdit
        }
    }

    @action.bound renderEdit(bookletOrder) {
        if (moment().local().isAfter(moment.utc(bookletOrder.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes'))) {
            return false;
        }

        let availableStatuesForEdit = _.map(_.filter(this.bookletOrderStatuses, function (x) { return x.abrv === 'pending' }), function (o) { return o.id });
        if (!_.some(availableStatuesForEdit, (item) => { return item === bookletOrder.bookletOrderStatusId })) {
            return false;
        }
    }

    setStores() {
        super.setStores();
    }
}


export default BookletOrderListViewStore;