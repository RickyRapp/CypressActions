import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { RoutingNumberCreateForm } from 'application/administration/bank/forms';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class RoutingNumberCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, id, onAfterAction) {
        super(rootStore, {
            name: 'routing-number-edit',
            id: id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.administration.bankStore.updateRoutingNumber({ id: id, ...resource });
                    },
                    create: async (resource) => {
                        await rootStore.application.administration.bankStore.createRoutingNumber(resource);
                    },
                    get: async (id) => {
                        let params = { embed: ['bank'] }
                        return rootStore.application.administration.bankStore.getRoutingNumber(id, params);
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: RoutingNumberCreateForm,
        });

        this.createBankDropdownStore();
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

    createBankDropdownStore() {
        this.bankDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.bankStore.findBank({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        fields: [
                            'id',
                            'name'
                        ]
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: x.name
                        }
                    });
                }
            });
    }
}

export default RoutingNumberCreateViewStore;
