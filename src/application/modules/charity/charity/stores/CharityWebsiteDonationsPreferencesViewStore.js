import { BaseEditViewStore } from 'core/stores';
import { CharityWebsiteDonationsPreferencesForm } from 'application/charity/charity/forms';

class CharityWebsiteDonationsPreferencesViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-website-donation-preferences',
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
            FormClass: CharityWebsiteDonationsPreferencesForm,
        })
    }
}


export default CharityWebsiteDonationsPreferencesViewStore;