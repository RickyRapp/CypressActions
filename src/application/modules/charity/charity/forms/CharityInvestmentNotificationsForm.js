import { FormBase } from 'core/components';

export default class CharityInvestmentNotificationsForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isNotifyOnDailyChangesEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.NOTIFY_INVESTMENT_DAILY_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.NOTIFY_INVESTMENT_DAILY',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'notifyOnDailyChangesAmount',
                    label: 'CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.INVESTMENT.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'number|min:0',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                }
            ]
        };
    }
}