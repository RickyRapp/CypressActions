import { FormBase } from 'core/components';

export default class CharityInvestmentNotificationsForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'notifyOnDailyChanges',
                    label: 'CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.NOTIFY_INVESTMENT_DAILY',
                    placeholder: 'CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.NOTIFY_INVESTMENT_DAILY',
                    rules: 'required|boolean',
                    type: 'toggle'
                },
                {
                    name: 'notifyOnDailyChangesAmount',
                    label: 'CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|number'
                }
            ]
        };
    }
}