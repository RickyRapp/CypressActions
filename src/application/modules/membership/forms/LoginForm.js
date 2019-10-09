import { FormBase } from 'core/components';

export default class LoginForm extends FormBase {
    constructor(hooks) {        
        super(hooks);
    }

    setup() {
        return {
            fields: [{
                name: 'email',
                label: 'LOGIN.USERNAME_LABEL',
                placeholder: 'LOGIN.USERNAME_PLACEHOLDER',
                rules: 'required|string|between:5,25'
            }, {
                name: 'password',
                label: 'LOGIN.PASSWORD_LABEL',
                type: 'password',
                placeholder: 'LOGIN.PASSWORD_PLACEHOLDER',
                rules: 'required|string|between:5,25',
            }],
        };
    }
}