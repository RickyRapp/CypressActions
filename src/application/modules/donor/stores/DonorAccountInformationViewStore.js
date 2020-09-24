import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorEditForm } from 'application/donor/forms';
import { LookupService } from 'common/services';
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
                    return await service.update({ id: this.id, ...resource });
                }
            },
            FormClass: DonorEditForm,
        });

        this.prefixTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'prefix-type');
                const response = await service.getAll();
                return response.data;
            }
        });
    }
}

export default DonorAccountInformationViewStore;
