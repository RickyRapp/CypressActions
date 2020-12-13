import { FormBase } from 'core/components';

export default class PasswordChangeForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'password',
                    label: 'PASSWORD_CHANGE.NEW_PASSWORD_LABEL',
                    type: 'password',
                    placeholder: 'PASSWORD_CHANGE.NEW_PASSWORD_PLACEHOLDER',
                    rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/']
                },
                {
                    name: 'confirmPassword',
                    label: 'PASSWORD_CHANGE.CONFIRM_PASSWORD_LABEL',
                    placeholder: 'PASSWORD_CHANGE.CONFIRM_PASSWORD_PLACEHOLDER',
                    rules: 'required|string|same:password',
                    type: 'password'
                }
            ],
        };
    }
}