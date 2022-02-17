import { FormBase } from 'core/components';

export default class CharityWebsiteDonationsPreferencesForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isNotifyExceedingTransactionEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.NOTIFY_TRANSACTIONS_EXCEEDING_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.NOTIFY_TRANSACTIONS_EXCEEDING',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'notifyExceedingTransactionAmount',
                    label: 'CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.API_WEBSITE_DONATIONS.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                }
            ]
        };
    }
}