import { CharityEditForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { LookupService } from 'common/services';

class CharityEditViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'charity',
            id: id,
            actions: () => {
                const service = new CharityService(rootStore.application.baasic.apiClient);
                return {
                    get: async (id) => {
                        const params = {
                            embed: [
                                'emailAddress',
                                'contactInformation',
                                'contactInformation.emailAddress',
                                'contactInformation.phoneNumber'
                            ]
                        }
                        const response = await service.get(id, params);
                        return response.data;
                    },
                    update: async (resource) => {
                        return await service.update(
                            {
                                id: id,
                                ...resource
                            });
                    }
                }
            },
            FormClass: CharityEditForm,
        });

        this.rootStore = rootStore;

        this.charityTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-type');
                    const response = await service.getAll();
                    return response.data;
                }
            });

        this.charityStatusDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-status');
                    const response = await service.getAll();
                    return response.data;
                }
            });
    }
}

export default CharityEditViewStore;
