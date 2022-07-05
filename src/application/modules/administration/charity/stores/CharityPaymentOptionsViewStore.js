import { BaseEditViewStore } from 'core/stores';
import { CharityPaymentOptionsForm } from 'application/charity/charity/forms';
import { action } from 'mobx';


class CharityPaymentOptionsViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-payment-options-edit',
            id: rootStore.routerStore.routerState.params.id,
            actions: () => {
                return {
                    get: async (id) => {
                        const data = await rootStore.application.charity.charityStore.getWithdrawSettings(id);
                        return {
                            keepFundsUntilManuallyDistributedIsEnabled : data.keepFundsUntilManuallyDistributedIsEnabled,
                            keepFundsUntilAccumulatedAmountIsEnabled : data.keepFundsUntilAccumulatedAmountIsEnabled,
                            accumulatedAmountExceeding : data.accumulatedAmountExceeding,
                            withdrawAmount: data.withdrawAmount
                        }
                    },
                    update: async (resource) => {
                        resource.id = rootStore.routerStore.routerState.params.id;
                        await this.rootStore.application.charity.charityStore.updateWithdrawSettings(resource);
                        rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                    }
                }
            },
            FormClass: CharityPaymentOptionsForm,
            onAfterAction: () => { this.getResource(this.id); }
        });
    }

    @action.bound
    changeManuallWithdrawSetting(e){
        if(e === true){
            this.form.$('keepFundsUntilManuallyDistributedIsEnabled').set(!e);
        }
        this.form.$('keepFundsUntilManuallyDistributedIsEnabled').setDisabled(e);
    }
}


export default CharityPaymentOptionsViewStore;