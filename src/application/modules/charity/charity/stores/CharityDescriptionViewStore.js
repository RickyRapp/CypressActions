import { BaseEditViewStore } from 'core/stores';
import { CharityDescriptionForm } from 'application/charity/charity/forms';
import { action, observable } from 'mobx';

class CharityDescriptionViewStore extends BaseEditViewStore{
    @observable isEditEnabled = false;
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-description',
            id: rootStore.userStore.applicationUser.id,
            actions: () => {
                return {
                    get: async () => {
                        const data = await rootStore.application.charity.charityStore.getCharity(rootStore.userStore.applicationUser.id);
                        this.isEditEnabled = true;
                        return {
                            description: data.description
                        };
                    },
                    update: async (resource) => {
                        const params = {
                            embed: ['contactInformation']
                        }
                        const data = await rootStore.application.charity.charityStore.getCharity(rootStore.userStore.applicationUser.id, params);

                        resource.name = data.name;
                        resource.charityStatusId = data.charityStatusId;
                        resource.charityTypeId = data.charityTypeId;
                        resource.dba = data.dba;
                        resource.contactInformationName = data.contactInformation.name;
                        resource.contactInformationEmail = data.contactInformation.email;
                        resource.contactInformationNumber = data.contactInformation.number;
                        resource.keepFundsUntilManuallyDistributedIsEnabled = data.keepFundsUntilManuallyDistributedIsEnabled;
                        resource.keepFundsUntilAccumulatedAmountIsEnabled = data.keepFundsUntilAccumulatedAmountIsEnabled;
                        resource.accumulatedAmountExceeding = data.accumulatedAmountExceeding;

                        await this.rootStore.application.charity.charityStore.updateCharity({ contactInformation: { name: resource.contactInformationName, email: resource.contactInformationEmail, number: resource.contactInformationNumber }, ...resource});
                        rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                    }
                }
            },
            FormClass: CharityDescriptionForm,
            onAfterAction: () => { this.getResource(this.id); }
        });
        
    }

    @action.bound
    onEnableEditClick() {
        this.isEditEnabled = !this.isEditEnabled;
    }

}


export default CharityDescriptionViewStore;