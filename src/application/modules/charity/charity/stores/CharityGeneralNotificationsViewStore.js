import { BaseEditViewStore } from 'core/stores';
import { CharityGeneralNotificationsForm } from 'application/charity/charity/forms';

class CharityGeneralNotificationsViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-general-notifications',
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
            FormClass: CharityGeneralNotificationsForm,
        })
    }
}


export default CharityGeneralNotificationsViewStore;