import { action, observable, computed } from 'mobx';
import { BookletOrderService, LookupService, BookletService } from "common/data";
import { BookletOrderReviewForm } from 'modules/administration/booklet-order/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import _ from 'lodash';

class BookletOrderReviewViewStore extends BaseEditViewStore {
    @observable bookletOrder = null;
    @observable denominationTypes = null;
    @observable accountTypes = null;
    @observable deliveryMethodTypeDropdownStore = null;
    @observable bookletDropdownStore = null;
    @observable refresh = 1;

    constructor(rootStore) {
        const bookletOrderService = new BookletOrderService(rootStore.app.baasic.apiClient);
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'booklet order review',
            id: id,
            actions: {
                update: async item => {
                    debugger;
                    return await bookletOrderService.review(item);
                },
                get: async id => {
                    let params = {};
                    params.embed = [
                        'bookletOrderItems'
                    ];
                    params.fields = [
                        'id',
                        'accountTypeId',
                        'donorAccountId',
                        'bookletOrderItems',
                        'bookletOrderItems.id',
                        'bookletOrderItems.count',
                        'bookletOrderItems.denominationTypeId',
                    ];
                    this.bookletOrder = await bookletOrderService.get(id, params);
                    return this.bookletOrder;
                }
            },
            FormClass: BookletOrderReviewForm,
            loader: true
        });

        this.bookletService = new BookletService(rootStore.app.baasic.apiClient);
    }

    async getResource(id, updateForm = true) {
        await super.getResource(id, updateForm);
        let arra = [];
        _.map(this.bookletOrder.bookletOrderItems, function (value) {
            arra.push({ id: value.id, count: value.count, denominationTypeId: value.denominationTypeId, bookletOrderItemBooklets: [] });
        });
        this.form.$('bookletOrderItems').add(arra);
        this.load();
        this.setStores();
    }

    @action.bound async load() {
        this.denominationTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'denomination-type');
        this.bookletOrderStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'booklet-order-status');
        this.accountTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'account-type');
        this.bookletStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'booklet-status');

        let accountTypesModels = await this.accountTypeLookupService.getAll();
        this.accountTypes = _.orderBy(accountTypesModels.data, ['sortOrder'], ['asc']);

        let bookletStatusModels = await this.bookletStatusLookupService.getAll();
        this.bookletStatuses = _.orderBy(bookletStatusModels.data, ['sortOrder'], ['asc']);

        let denominationTypesModels = await this.denominationTypeLookupService.getAll();
        if (this.bookletOrder.accountTypeId === this.basicAccountTypeId) {
            this.denominationTypes = _.filter(this.denominationTypes, function (item) { return item.abrv !== 'blank' });
        }
        else {
            this.denominationTypes
        }
        this.denominationTypes = _.orderBy(denominationTypesModels.data, ['sortOrder'], ['asc']);
    }

    @action.bound setStores() {
        this.bookletDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false,
                initFetch: false
            },
            {
                fetchFunc: async (searchObject) => {
                    let options = {
                        page: 1,
                        rpp: 15,
                        embed: [''],
                        fields: [
                            'id',
                            'code'
                        ]
                    };
                    if (searchObject) {
                        if (searchObject.code.length <= 6) {
                            options.codes = searchObject.code;
                        }
                        else {
                            options.certificateBarcodes = searchObject.code;
                        }
                    }
                    options.bookletStatusIds = [this.cleanBookletStatusId]
                    options.denominationTypeIds = searchObject.denominationTypeId;

                    let response = await this.bookletService.find(options);
                    return _.map(response.item, x => { return { id: x.id, name: x.code } });
                }
            }
        );
    }

    @computed get basicAccountTypeId() {
        return this.accountTypes ? _.find(this.accountTypes, { abrv: 'basic' }).id : null;
    }

    @computed get cleanBookletStatusId() {
        return this.bookletStatuses ? _.find(this.bookletStatuses, { abrv: 'clean' }).id : null;
    }
}

export default BookletOrderReviewViewStore;