import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorEditForm } from 'application/donor/forms';
import { DonorService } from 'application/donor/services';

class DonorAccountInformationViewStore extends BaseEditViewStore {
    constructor(rootStore, donorId) {
        const service = new DonorService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'general-data',
            id: donorId,
            actions: {
                get: async (id) => {
                    const response = await service.get(id);
                    return response.data;
                },
                update: async (resource) => {
                    return service.updateGeneralData({ id: this.id, ...resource });
                }
            },
            FormClass: DonorEditForm,
        });

        this.prefixTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.prefixTypeStore.find();
            }
        });
    }
}

export default DonorAccountInformationViewStore;
