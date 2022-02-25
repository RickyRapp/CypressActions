import { BaseEditViewStore } from 'core/stores';
import { CharityPaymentOptionsForm } from 'application/charity/charity/forms';


class CharityPaymentOptionsViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'payment-options-edit',
            id: rootStore.userStore.applicationUser.id,
            actions: () => {
                return {
                    get: async (id) => {
                        const data = await rootStore.application.charity.charityStore.getCharity(id);
                        return {
                            keepFundsUntilManuallyDistributedIsEnabled : data.keepFundsUntilManuallyDistributedIsEnabled,
                            keepFundsUntilAccumulatedAmountIsEnabled : data.keepFundsUntilAccumulatedAmountIsEnabled,
                            accumulatedAmountExceeding : data.accumulatedAmountExceeding
                        }
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
                        resource.description = data.description;
                        resource.contactInformationName = data.contactInformation.name;
                        resource.contactInformationEmail = data.contactInformation.email;
                        resource.contactInformationNumber = data.contactInformation.number;

                        await this.rootStore.application.charity.charityStore.updateCharity({ contactInformation: { name: resource.contactInformationName, email: resource.contactInformationEmail, number: resource.contactInformationNumber }, ...resource });
                        rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                    }
                }
            },
            FormClass: CharityPaymentOptionsForm,
            onAfterAction: () => { this.getResource(this.id); }
        });
    }
}


export default CharityPaymentOptionsViewStore;