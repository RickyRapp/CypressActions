import { BaseEditViewStore } from 'core/stores';
import { CharityCommunicationPreferenceForm } from 'application/charity/charity/forms';

class CharityCommunicationPreferenceViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-communication-preferences',
            id: rootStore.userStore.applicationUser.id,
            actions: {
                get: async (id) => {
                    return rootStore.application.charity.charityStore.getCommunicationPreferences(id);
                },
                update: async (resource) => {
                    resource.charityId = rootStore.userStore.applicationUser.id;
                    await rootStore.application.charity.charityStore.updateCommunicationPreferences(resource);
                    rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                }
            },
            FormClass: CharityCommunicationPreferenceForm,
            onAfterAction: () => { this.getResource(this.id); }
        })
    }
}


export default CharityCommunicationPreferenceViewStore;