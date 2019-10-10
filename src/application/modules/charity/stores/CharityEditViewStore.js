import { action } from 'mobx';
import { CharityEditForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityService } from 'application/charity/services';

@applicationContext
class CharityEditViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'charity',
            id: id,
            Form: CharityEditForm,
            actions: () => {
                const service = new CharityService(rootStore.application.baasic.apiClient);
                return {
                    get: async (id, opts) => {
                        const response = await service.get(id, opts);
                        return response.data;
                    },
                    update: async (resource) => {
                        const response = await service.update(resource);
                        return response.data;
                    }
                }
            },
            FormClass: CharityEditForm,
        });

        // this.charityTypeDropdownStore = new BaasicDropdownStore(null, null,
        //     {
        //         onChange: (charityTypeId) => {
        //             this.item.charityTypeId = charityTypeId;
        //             this.form.set({ charityTypeId: charityTypeId });
        //         }
        //     });

        // this.charityStatusDropdownStore = new BaasicDropdownStore(null, null,
        //     {
        //         onChange: (charityStatusId) => {
        //             this.item.charityStatusId = charityStatusId;
        //             this.form.set({ charityStatusId: charityStatusId });
        //         }
        //     });

        // this.fetch([
        //     this.fetchCharityTypes(),
        //     this.fetchCharityStatuses()
        // ]);
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
    }

    @action.bound
    async fetchCharityTypes() {
        this.charityTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'prefix-type');
        const response = await service.getAll();
        runInAction(() => {
            this.prefixTypeDropdownStore.setItems(response.data);
            this.prefixTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchCharityStatuses() {
        this.prefixTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
        const response = await service.getAll();
        runInAction(() => {
            this.deliveryMethodTypeDropdownStore.setItems(response.data);
            this.deliveryMethodTypeDropdownStore.setLoading(false);
        });
    }
}

export default CharityEditViewStore;
