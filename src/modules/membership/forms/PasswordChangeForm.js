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
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter New Password',
                    rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/']
                },
                {
                    name: 'confirmPassword',
                    label: 'Confirm password',
                    placeholder: 'Confirm New Password',
                    rules: 'required|string|same:password',
                    type: 'password'
                }
            ],
        };
    }
}
