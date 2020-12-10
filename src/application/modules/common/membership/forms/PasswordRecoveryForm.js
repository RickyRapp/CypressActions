import { FormBase } from 'core/components';

export default class PasswordRecoveryForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'userName',
                    label: 'PASSWORD_RECOVERY.USERNAME_LABEL',
                    placeholder: 'PASSWORD_RECOVERY.USERNAME_PLACEHOLDER',
                    rules: 'required'
                },
                {
                    name: 'recaptcha',
                    rules: 'required'
                }
            ],
        };
    }
}