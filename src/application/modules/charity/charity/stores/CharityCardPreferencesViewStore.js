import { BaseEditViewStore } from 'core/stores';
import { CharityCardPreferencesForm } from 'application/charity/charity/forms';

class CharityCardPreferencesViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-card-preferences',
            autoInit: false,
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
            FormClass: CharityCardPreferencesForm,
        })
    }
}


export default CharityCardPreferencesViewStore;