import { FormBase } from 'core/components';

export default class CharityGeneralNotificationsForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isNotifyDonorsApprovedGrantEnabled',
                    label: 'CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT_LABEL',
                    placeholder: 'CHARITY.CARD_PREFERENCES.GENERAL_NOTIFICATIONS.FIELDS.NOTIFY_APPROVED_GRANT',
                    rules: 'required|boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}