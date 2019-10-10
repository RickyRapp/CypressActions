import { action } from 'mobx';
import { CharityCreateForm } from 'application/charity/forms';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityService } from 'application/charity/services';

@applicationContext
class CharityCreateViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'charity',
            id: id,
            Form: CharityCreateForm,
            actions: () => {
                const service = new CharityService(rootStore.application.baasic.apiClient);
                return {
                    get: async (id, opts) => {
                        const response = await service.get(id, opts);
                        return response.data;
                    },
                    create: async (resource) => {
                        const response = await service.create(resource);
                        return response.data;
                    }
                }
            },
            FormClass: CharityCreateForm,
        });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
    }
}

export default CharityCreateViewStore;
