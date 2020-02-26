import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { RoutingNumberCreateForm } from 'application/administration/bank/forms';
import { RoutingNumberService, BankService } from 'application/administration/bank/services';
import _ from 'lodash';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class RoutingNumberCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, id, onAfterAction) {
        const service = new RoutingNumberService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'routing-number-edit',
            id: id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await service.update({ id: id, ...resource });
                    },
                    create: async (resource) => {
                        await service.create(resource);
                    },
                    get: async (id) => {
                        let params = { embed: ['bank'] }
                        let response = await service.get(id, params);
                        return response.data;
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: RoutingNumberCreateForm,
        });

        const bankService = new BankService(rootStore.application.baasic.apiClient);
        this.bankDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await bankService.find({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        fields: [
                            'id',
                            'name'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: x.name
                        }
                    });
                }
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            if (this.id) {
                await this.fetch([
                    this.getResource(this.id)
                ]);

                this.bankDropdownStore.setValue({ id: this.item.bank.id, name: this.item.bank.name });
            }
        }
    }
}

export default RoutingNumberCreateViewStore;
