import { observable } from 'mobx';
import { BookletOrderService, DonorAccountService } from "common/data";
import { BookletOrderListFilter } from 'modules/administration/booklet-order/models';
import { BaseBookletOrderListViewStore } from 'modules/common/booklet-order/stores';
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
                }
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

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.bookletOrderService = bookletOrderService;

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
            onReview: (bookletOrder) => { this.bookletOrderId = bookletOrder.id; this.reviewModalParams.open(); }
        }

        this.setRenderActions = {
            renderReview: this.renderReview
        }
    }

    setStores() {
        super.setStores();
    }
}


export default BookletOrderListViewStore;