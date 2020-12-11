import { FormBase } from 'core/components';

export default class UserPasswordChangeForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'newPassword',
                    label: 'USER.PASSWORD_CHANGE.PASSWORD_LABEL',
                    placeholder: 'USER.PASSWORD_CHANGE.PASSWORD_PLACEHOLDER',
                    rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                    type: 'password'
                },
                {
                    name: 'sendMailNotification',
                    label: 'USER.PASSWORD_CHANGE.SEND_PASSWORD_CHANGE_EMAIL_LABEL',
                    type: 'checkbox'
                }
            ],
        };
    }
}
