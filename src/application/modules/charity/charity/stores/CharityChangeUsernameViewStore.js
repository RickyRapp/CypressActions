import { BaseEditViewStore } from 'core/stores';
import { CharityChangeUsernameForm } from 'application/charity/charity/forms';

class CharityChangeUsernameViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-change-username',
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
            FormClass: CharityChangeUsernameForm,
        })
    }
}


export default CharityChangeUsernameViewStore;