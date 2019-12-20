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
                                'contactInformation'
                            ]
                        }
                        const response = await service.get(id, params);
                        return response.data;
                    },
                    update: async (resource) => {
                        await service.update(
                            {
                                id: id,
                                ...resource
                            });
                        this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                    }
                }
            },
            FormClass: CharityEditForm,
            onAfterAction: () => this.getResource()
        });

        this.charityTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(rootStore.application.baasic.apiClient, 'charity-type');
                    const response = await service.getAll();
                    return response.data;
                }
            });

        this.charityStatusDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(rootStore.application.baasic.apiClient, 'charity-status');
                    const response = await service.getAll();
                    return response.data;
                }
            });
    }
}

export default CharityEditViewStore;
