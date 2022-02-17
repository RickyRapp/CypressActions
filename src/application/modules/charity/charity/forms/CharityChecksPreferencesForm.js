import { FormBase } from 'core/components';

export default class CharityChecksPreferencesForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
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
                }
            ]
        };
    }
}