import { BaseEditViewStore } from 'core/stores';
import { CharityChangeUsernameForm } from 'application/charity/charity/forms';

class CharityChangeUsernameViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-change-username',
            id: rootStore.userStore.applicationUser.id,
            actions: () => {
                return {
                    get: async (id) => {
                        const response = await rootStore.application.charity.charityStore.getCharityLoginProfile(id);
                        this.coreUserId = response.coreUserId;
                        return response;
                    },
                    update: async (resource) => {
                        await rootStore.application.charity.charityStore.updateGeneralData(resource);
                        rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                    }
                }
            },
            FormClass: CharityChangeUsernameForm,
            onAfterAction: () => { this.getResource(this.id); }
        });

        this.coreUserId = null;
    }
}


export default CharityChangeUsernameViewStore;