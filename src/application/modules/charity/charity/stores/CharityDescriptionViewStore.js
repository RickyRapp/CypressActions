import { BaseEditViewStore } from 'core/stores';
import { CharityDescriptionForm } from 'application/charity/charity/forms';

class CharityDescriptionViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-description',
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
            FormClass: CharityDescriptionForm,
        })
    }
}


export default CharityDescriptionViewStore;