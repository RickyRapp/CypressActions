import { FormBase } from 'core/components';

export default class CharityCardPreferencesForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isNotifyAchPaymentsEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_ACH_PAYMENT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_ACH_PAYMENT',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'emailToNotifyPayments',
                    label: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.EMAIL_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.EMAIL_PLACEHOLDER',
                    rules: 'required|string',
                    type : 'email'
                },
                {
                    name: 'isNotifyCheckPaymentsEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_CHECK_PAYMENT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_CHECK_PAYMENT',
                    rules: 'required|boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}