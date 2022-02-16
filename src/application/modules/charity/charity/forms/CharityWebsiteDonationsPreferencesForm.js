import { FormBase } from 'core/components';

export default class CharityWebsiteDonationsPreferencesForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'notifyExceedingTransaction',
                    label: 'CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.NOTIFY_TRANSACTIONS_EXCEEDING',
                    placeholder: 'CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.NOTIFY_TRANSACTIONS_EXCEEDING',
                    rules: 'required|boolean',
                    type: 'toggle'
                },
                {
                    name: 'notifyExceedingTransactionAmount',
                    label: 'CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|number'
                }
            ]
        };
    }
}