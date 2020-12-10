import { BaseEditViewStore } from 'core/stores';
import { DonorCommunicationPreferenceForm } from 'application/donor/donor/forms';

class DonorCommunicationPreferenceViewStore extends BaseEditViewStore {
    constructor(rootStore, donorId) {
        super(rootStore, {
            name: 'donor-communication-preferences',
            id: rootStore.userStore.applicationUser.id,
            actions: {
                get: async (id) => {
                    return rootStore.application.donor.donorStore.getCommunicationPreferences(id);
                },
                update: async (resource) => {
                    return await rootStore.application.donor.donorStore.updateCommunicationPreferences(resource);
                }
            },
            FormClass: DonorCommunicationPreferenceForm,
        });
    }
}

export default DonorCommunicationPreferenceViewStore;
