import { FormBase } from 'core/components';

export default class CharityCommunicationPreferenceForm extends FormBase {
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
                    name: 'isNotifyCheckPaymentsEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_CHECK_PAYMENT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.NOTIFY_CHECK_PAYMENT',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isNotifyCheckExceedingEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.CHECKBOX_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_CHECK_DONATION',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'notifyCheckExceedingAmount',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'isNotifyProcessedSessionEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.CHECKBOX_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_PROCESSED_SESSION',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isNotifyRemoteSessionApprovedEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.CHECKBOX_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_APPROVED_SESSION',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isNotifyDelayedCheckEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.CHECKBOX_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_DELAYED_CHECK',
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
                },
                {
                    name: 'isNotifyDonorsApprovedGrantEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
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
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'cardTransactionExceedingAmount',
                    label: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CARD.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'isNotifyWhenCheckReleasedFromHold',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_WHEN_CHECK_RELEASED',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_WHEN_CHECK_RELEASED',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
            ]
        };
    }
}