import { BaseEditViewStore } from 'core/stores';
import { CharityDescriptionForm } from 'application/charity/charity/forms';
import { action, observable } from 'mobx';

class CharityDescriptionViewStore extends BaseEditViewStore{
    @observable isEditEnabled = false;
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-description',
            autoInit: false,
            id: rootStore.userStore.applicationUser.id,
            actions: () => {
                return {
                    get: async (id) => {
                        const data = await rootStore.application.charity.charityStore.getCharity(id);
                        return {
                            description: data.description
                        }
                    },
                    update: async (resource) => { console.log(resource);
                        await this.rootStore.application.charity.charityStore.updateCharity(resource);
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