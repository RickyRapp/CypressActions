import { action, observable } from 'mobx';
import { BookletOrderReviewForm } from 'application/administration/booklet-order/forms';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { join, orderBy } from 'lodash';

@applicationContext
class BookletOrderReviewViewStore extends BaseEditViewStore {
    @observable orderContents = [];
    @observable order;

    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet-order-create',
            id: rootStore.routerStore.routerState.params.id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        console.log(resource);
                        return;
                        await this.rootStore.application.administration.bookletOrderStore.reviewBookletOrder({ ...resource, bookletOrderContents: this.orderContents });
                    },
                    get: async (id) => {
                        const data = await this.rootStore.application.administration.bookletOrderStore.getBookletOrder(id, { embed: 'donor,deliveryMethodType,booklets' });
                        this.order = data;
                        const temp = JSON.parse(data.json)
                        temp.forEach(c => { c.booklets = []; c.denominationTypeValue = this.denominationTypes.find(d => d.id === c.denominationTypeId).value }); //denominationTypeValue is added only for sorting
                        this.orderContents = orderBy(temp, ['denominationTypeValue'], ['desc']);
                        return { id: data.id, trackingNumber: data.trackingNumber };
                    }
                }
            },
            FormClass: BookletOrderReviewForm
        });

        this.createFetchFunc();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.loadLookups();
            await this.fetch([
                this.getResource(this.id),
            ]);
        }
    }

    @action.bound
    onAddBookletsChange(item, booklets) {
        this.orderContents.find(c => c.bookletTypeId === item.bookletTypeId && c.denominationTypeId === item.denominationTypeId).booklets = booklets;
    }

    async loadLookups() {
        this.bookletStatuses = await this.rootStore.application.lookup.bookletStatusStore.find();
        this.bookletTypes = await this.rootStore.application.lookup.bookletTypeStore.find();
        this.denominationTypes = await this.rootStore.application.lookup.denominationTypeStore.find();
    }

    createFetchFunc() {
        this.fetchFunc = async (searchQuery, denominationTypeId, bookletTypeId) => {
            if (isNullOrWhiteSpacesOrUndefinedOrEmpty(searchQuery)) {
                return [];
            }

            let options = {
                pageNumber: 1,
                pageSize: 10,
                exceptIds: join(this.orderContents.filter(c => c.booklets.length > 0).map(c => { return c.booklets.map(x => { return x.id }) }), ','),
                fields: ['id', 'code']
            };

            if (searchQuery.length === 5 || searchQuery.length === 6) {
                options.codes = searchQuery;
            }
            else if (searchQuery.length === 10) {
                options.certificateBarcodes = searchQuery;
            }
            else {
                return [];
            }

            options.bookletStatusIds = [this.bookletStatuses.find(c => c.abrv === 'clean').id]
            options.bookletTypeIds = bookletTypeId;
            if (bookletTypeId === this.bookletTypes.find(c => c.abrv === 'classic').id) {
                options.denominationTypeIds = [denominationTypeId];
            }
            const data = await this.rootStore.application.administration.bookletOrderStore.findBooklets(options);
            return data.item.map(c => { return { id: c.id, code: c.code.toString() } });
        }
    }
}

export default BookletOrderReviewViewStore;
