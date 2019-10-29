import { action, runInAction, observable, computed } from 'mobx';
import { BookletOrderReviewForm } from 'application/booklet-order/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { BookletOrderService } from 'application/booklet-order/services';
import { BookletService } from 'application/booklet/services';
import { LookupService } from 'common/services';
import _ from 'lodash';

const ErrorType = {
    AssignError: 0
};

@applicationContext
class BookletOrderReviewViewStore extends BaseEditViewStore {
    bookletStatuses = null;

    constructor(rootStore) {
        const service = new BookletOrderService(rootStore.application.baasic.apiClient);
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'booklet-order-create',
            id: id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        _.forEach(resource.bookletOrderItems, function (params) {
                            if (params.count !== params.bookletOrderItemBooklets.length) {
                                throw { type: ErrorType.AssignError };
                            }
                        })

                        try {
                            return await service.review({
                                id: id,
                                ...resource
                            });
                        } catch (err) {
                            console.log(err)
                            //TODO:send status code/type from backend
                            // throw { type: ErrorType.InsufficientFunds, error: err };
                        }
                    },
                    get: async (id) => {
                        const params = {
                            embed: [
                                'bookletOrderItems',
                                'bookletOrderItems.bookletOrderItemBooklets',
                                'bookletOrderItems.bookletOrderItemBooklets.booklet'
                            ],
                            fields: [
                                'id',
                                'bookletOrderItems',
                                'bookletOrderItems.id',
                                'bookletOrderItems.count',
                                'bookletOrderItems.denominationTypeId',
                                'bookletOrderItems.bookletOrderItemBooklets'
                            ]
                        }
                        const response = await service.get(id, params);
                        this.bookletOrder = response.data;
                        return response.data;
                    }
                }
            },
            errorActions: {
                onUpdateError: ({ type }) => {
                    switch (type) {
                        case ErrorType.AssignError:
                            break;
                        default:
                            rootStore.notificationStore.success('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
            FormClass: BookletOrderReviewForm
        });

        this.id = id;
        const bookletService = new BookletService(rootStore.application.baasic.apiClient);

        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore();
        this.denominationTypeDropdownStore = new BaasicDropdownStore();

        this.fetchFunc = async (searchQuery, denominationTypeId, usedBookletIds) => {
            let options = {
                pageNumber: 1,
                pageSize: 10,
                exceptIds: usedBookletIds,
                fields: [
                    'id',
                    'code'
                ]
            };

            if (searchQuery) {
                if (searchQuery.length <= 6) {
                    options.codes = searchQuery;
                }
                else {
                    options.certificateBarcodes = searchQuery;
                }
            }
            options.bookletStatusIds = [_.find(this.bookletStatuses, { abrv: 'clean' }).id]
            options.denominationTypeIds = [denominationTypeId];

            const response = await bookletService.find(options);
            return _.map(response.data.item, x => { return { id: x.id, name: x.code } });
        }
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchBookletStatuses(),
                this.fetchDenominationTypes()
            ]);

            await this.getResource(this.id);
            let arra = [];
            _.map(this.bookletOrder.bookletOrderItems, (item) => {
                let arra2 = []
                _.map(item.bookletOrderItemBooklets, (item2) => {
                    arra2.push({ bookletId: item2.bookletId, booklet: { code: item2.booklet.code } })
                });
                arra.push({ id: item.id, count: item.count, denominationTypeId: item.denominationTypeId, bookletOrderItemBooklets: arra2 });
            });
            this.form.$('bookletOrderItems').add(arra);
            this.form.$('id').set(this.id);
        }
    }

    @action.bound
    async fetchBookletStatuses() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'booklet-status');
        const response = await service.getAll();
        this.bookletStatuses = response.data;
    }

    @action.bound
    async fetchDenominationTypes() {
        this.denominationTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
        const response = await service.getAll();
        this.denominationTypes = response.data;
    }
}

export default BookletOrderReviewViewStore;
