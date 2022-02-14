import { BaseEditViewStore } from 'core/stores';
import { CharityChangePasswordForm } from 'application/charity/charity/forms';

class CharityChangePasswordViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-change-password',
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
            FormClass: CharityChangePasswordForm,
        })
    }
}


export default CharityChangePasswordViewStore;