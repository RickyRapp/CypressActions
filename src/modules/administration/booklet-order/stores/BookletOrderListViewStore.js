import { action, observable } from 'mobx';
import { BookletOrderService, DonorAccountService } from "common/data";
import { BookletOrderListFilter } from 'modules/administration/booklet-order/models';
import { BaseBookletOrderListViewStore } from 'modules/common/booklet-order/stores';
import { BaasicDropdownStore } from "core/stores";
import { ModalParams } from 'core/models';
import { getDonorNameDropdown } from 'core/utils';
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
        filter.donorAccountId = rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.donorAccountId : null;

        const listViewStore = {
            routes: {
                create: () => {
                    this.findDonorModalParams.open();
                },
                donorAccountEdit: (userId) => {
                    this.rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: userId });
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
                filter: filter
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

        this.findDonorModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.setColumns = [
            {
                key: 'donorAccount.donorName',
                title: 'DONORNAME',
                onClick: item => this.routes.donorAccountEdit(item.donorAccountId)
            },
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
        this.setAdditionalStores();
    }

    @action.bound renderReview(bookletOrder) {
        let availableStatuesForReview = _.map(_.filter(this.bookletOrderStatuses, function (x) { return x.abrv === 'pending' || x.abrv === 'in-process' || x.abrv === 'funded' }), function (o) { return o.id });
        return _.some(availableStatuesForReview, (item) => { return item === bookletOrder.bookletOrderStatusId });
    }

    @action.bound async onChangeSearchDonor(option) {
        if (option) {
            this.rootStore.routerStore.navigate('master.app.administration.booklet-order.create', {
                userId: option.id
            })
        }
    }

    @action.bound async setAdditionalStores() {
        this.donorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Donor',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address,companyProfile' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.donorAccountId = (option ? option.id : null)
            }
        );

        if (this.queryUtility.filter.donorAccountId) {
            let params = {};
            params.embed = ['coreUser,donorAccountAddresses,address,companyProfile'];
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }
}


export default BookletOrderListViewStore;