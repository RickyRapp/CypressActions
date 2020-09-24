import { BaseEditViewStore } from 'core/stores';
import { DonorCommunicationPreferenceForm } from 'application/donor/forms';
import { DonorCommunicationPreferenceService } from 'application/donor/services';

class DonorCommunicationPreferenceViewStore extends BaseEditViewStore {
    constructor(rootStore, donorId) {
        const service = new DonorCommunicationPreferenceService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'donor-communication-preferences',
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
            FormClass: DonorCommunicationPreferenceForm,
        });
    }
}

export default DonorCommunicationPreferenceViewStore;
