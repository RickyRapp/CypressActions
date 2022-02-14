import { BaseEditViewStore } from 'core/stores';
import { async } from 'rxjs/internal/scheduler/async';
import { CharityPaymentOptionsForm } from 'application/charity/charity/forms';

class CharityPaymentOptionsViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'payment-options-edit',
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
            FormClass: CharityPaymentOptionsForm,
        });
    }
}


export default CharityPaymentOptionsViewStore;