import { action, computed, observable } from 'mobx';
import { BookletOrderEditForm, BookletOrderReviewForm } from 'application/administration/booklet-order/forms';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { join, orderBy } from 'lodash';

@applicationContext
class BookletOrderEditViewStore extends BaseEditViewStore {
    @observable orderContents = [];
    @observable order;
    @observable donor = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet-order-edit',
            id: rootStore.routerStore.routerState.params.id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await this.rootStore.application.donor.bookletOrderStore.updateBookletOrder({ ...resource, 
                            bookletOrderItems: this.orderContents.map(x =>  ({count: x.bookletCount, denominationTypeId: x.denominationTypeId})), 
                            shippingAddressLine1: this.order.shippingAddressLine1,
                            shippingAddressLine2: this.order.shippingAddressLine2,
                            shippingCity: this.order.shippingCity,
                            shippingState: this.order.shippingState,
                            shippingZipCode: this.order.shippingZipCode,
                            trackingNumber: this.form.$('trackingNumber').value
                        });
                    },
                    get: async (id) => {
                        const data = await this.rootStore.application.donor.bookletOrderStore.getBookletOrder(id, { embed: 'donor,deliveryMethodType,booklets' });
                        this.order = data;
                        const temp = JSON.parse(data.json)
                        temp.forEach(c => { c.booklets = []; c.denominationTypeValue = this.denominationTypes.find(d => d.id === c.denominationTypeId).value }); //denominationTypeValue is added only for sorting
                        this.orderContents = orderBy(temp, ['denominationTypeValue'], ['desc']);
                        this.form.$('deliveryMethodTypeId').value = data.deliveryMethodTypeId;
                        return { id: data.id, trackingNumber: data.trackingNumber };
                    }
                }
            },
            FormClass: BookletOrderEditForm
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
        const donorId = this.rootStore.userStore.applicationUser.id;
        this.donor = await this.rootStore.application.donor.bookletOrderStore.getDonorInformation(donorId);
        console.log(this.prepaidBookletAmount);
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

    @computed get prepaidBookletAmount() {
        if (this.orderContents.length > 0) {
            let total = 0;
            const classicBookletTypeId = this.bookletTypes.find(c => c.abrv === 'classic').id;
            this.orderContents.filter(c => c.bookletTypeId === classicBookletTypeId).forEach(order => {
                const dtvalue = this.denominationTypes.find(dt => dt.id === order.denominationTypeId).value;
                total += dtvalue === 1 || dtvalue === 2 || dtvalue === 3 || dtvalue === 5 ? dtvalue * order.bookletCount * 50 : 0
            });
            return total;
        }
        return 0;
    }

    @computed get needsMoreFunds() {
        if (this.donor) {
            const totalContributionsUpcoming = this.donor.contribution.map(item => item.amount).reduce((a, b) => a + b, 0);
            return (this.prepaidBookletAmount > (this.donor.availableBalance + this.donor.lineOfCredit + totalContributionsUpcoming));
        }
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

export default BookletOrderEditViewStore;
