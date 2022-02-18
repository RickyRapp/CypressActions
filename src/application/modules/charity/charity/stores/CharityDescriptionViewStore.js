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
            actions: {
                    get: async () => {
                        const data = await rootStore.application.charity.charityStore.getCharity(rootStore.userStore.applicationUser.id); console.log(data);
                        return {
                            description: data.description
                        };
                    },
                    update: async (resource) => {
                        const params = {
                            embed: ['contactInformation']
                        }
                        const data = await rootStore.application.charity.charityStore.getCharity(rootStore.userStore.applicationUser.id, params);
                        console.log(data.apiKey);
                        resource.name = data.name,
                        resource.taxId = data.taxId,
                        resource.charityStatusId = data.charityStatusId,
                        resource.charityTypeId = data.charityTypeId,
                        resource.contactInformationName = data.contactInformation.name,
                        resource.contactInformationEmail = data.contactInformation.email,
                        resource.contactInformationNumber = data.contactInformation.number,
                        resource.presentBalance = data.presentBalance,
                        resource.apiKey = data.apiKey

                        await this.rootStore.application.charity.charityStore.updateCharity({ contactInformation: { name: resource.contactInformationName, email: resource.contactInformationEmail, number: resource.contactInformationNumber }, ...resource});
                    }
            },
            FormClass: CharityDescriptionForm,
        });
        
    }


    @action.bound
    onEnableEditClick() {
        this.isEditEnabled = !this.isEditEnabled;
    }

    @action.bound
	async onInit({ initialLoad }) {
		if (!initialLoad) {
			this.rootStore.routerStore.goBack();
		} else {
			await this.fetch([this.getCharityInfo()]);
		}
	}

    async getCharityInfo() {
        this.charity = await this.rootStore.application.charity.charityStore.getCharity(this.charityId);
    }
}


export default CharityDescriptionViewStore;