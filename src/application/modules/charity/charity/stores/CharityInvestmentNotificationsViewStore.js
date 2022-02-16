import { BaseEditViewStore } from 'core/stores';
import { CharityInvestmentNotificationsForm } from 'application/charity/charity/forms';

class CharityInvestmentNotificationsViewStore extends BaseEditViewStore{
    constructor(rootStore){
        super(rootStore, {
            name: 'charity-investment-notifications',
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
            FormClass: CharityInvestmentNotificationsForm,
        })
    }
}


export default CharityInvestmentNotificationsViewStore;