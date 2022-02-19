import { BaseEditViewStore } from 'core/stores';
import { CharityCommunicationPreferenceForm } from 'application/charity/charity/forms';

class CharityCommunicationPreferenceViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-communication-preferences',
            actions: () => {
                return {
                    update: async () => {
                        return true;
                    },
                    get: async (id) => {
                        return true;
                    }
                }
            },
            FormClass: CharityCommunicationPreferenceForm,
        })
    }
}


export default CharityCommunicationPreferenceViewStore;