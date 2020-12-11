import { BaseEditViewStore } from 'core/stores';
import { DonorCommunicationPreferenceForm } from 'application/administration/donor/forms';

class DonorCommunicationPreferenceViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-communication-preferences',
            id: rootStore.routerStore.routerState.params.id,
            actions: {
                get: async (id) => {
                    return rootStore.application.administration.donorStore.getCommunicationPreferences(id);
                },
                update: async (resource) => {
                    return await rootStore.application.administration.donorStore.updateCommunicationPreferences(resource);
                }
            },
            FormClass: DonorCommunicationPreferenceForm,
        });
    }
}

export default DonorCommunicationPreferenceViewStore;
