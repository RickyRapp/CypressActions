import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorEditForm } from 'application/donor/forms';
import { LookupService } from 'common/services';
import { DonorService } from 'application/donor/services';

class DonorGeneralDataEditViewStore extends BaseEditViewStore {
    constructor(rootStore, donorId) {
        const service = new DonorService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'general-data',
            id: donorId,
            actions: {
                get: async (id) => {
                    const response = await service.get(id);
                    if (response) {
                        response.data.firstName = response.data.coreUser.firstName;
                        response.data.lastName = response.data.coreUser.lastName;
                        if (response.data && response.data.coreUser && response.data.coreUser.json) {
                            const coreUserJson = JSON.parse(response.data.coreUser.json);
                            response.data.middleName = coreUserJson.middleName;
                            response.data.prefixTypeId = coreUserJson.prefixTypeId;
                        }
                    }
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

export default DonorGeneralDataEditViewStore;
