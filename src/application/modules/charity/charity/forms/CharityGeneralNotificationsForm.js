import { FormBase } from 'core/components';

export default class CharityGeneralNotificationsForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'notifyDonorsApprovedGrant',
                    label: 'CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT',
                    placeholder: 'CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT',
                    rules: 'required|boolean',
                    type: 'toggle'
                }
            ]
        };
    }
}