import { FormBase } from 'core/components';

export default class CharityChecksPreferencesForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'notifyCheckExceeding',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_CHECK_DONATION',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_CHECK_DONATION',
                    rules: 'required|boolean',
                    type: 'toggle'
                },
                {
                    name: 'notifyCheckExceedingAmount',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|number'
                },
                {
                    name: 'notifyProcessedSession',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_PROCESSED_SESSION',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_PROCESSED_SESSION',
                    rules: 'required|boolean',
                    type: 'toggle'
                },
                {
                    name: 'notifyRemoteSessionApproved',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_APPROVED_SESSION',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_APPROVED_SESSION',
                    rules: 'required|boolean',
                    type: 'toggle'
                },
                {
                    name: 'notifyDelayedCheck',
                    label: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_DELAYED_CHECK',
                    placeholder: 'CHARITY.CARD_PREFERENCES.CHECKS_REMOTE_DEPOSITS.FIELDS.NOTIFY_DELAYED_CHECK',
                    rules: 'required|boolean',
                    type: 'toggle'
                }
            ]
        };
    }
}