import { BaseEditViewStore } from 'core/stores';
import { CharityDescriptionForm } from 'application/charity/charity/forms';
import { action, observable } from 'mobx';

class CharityDescriptionViewStore extends BaseEditViewStore{
    @observable isEditEnabled = false;
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


    @action.bound
    onEnableEditClick() {
        this.isEditEnabled = !this.isEditEnabled;
    }
}


export default CharityDescriptionViewStore;