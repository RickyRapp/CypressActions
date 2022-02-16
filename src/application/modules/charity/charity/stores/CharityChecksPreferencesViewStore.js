import { BaseEditViewStore } from 'core/stores';
import { CharityChecksPreferencesForm } from 'application/charity/charity/forms';

class CharityChecksPreferencesViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-check-preferences',
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
            FormClass: CharityChecksPreferencesForm,
        })
    }
}


export default CharityChecksPreferencesViewStore;