import { FormBase } from 'core/components';

export default class CharityChangePasswordForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'charityChangePassword',                    
                    label: 'CHARITY.CHANGE_PASSWORD.FIELDS.CHANGE_PASSWORD_LABEL',
                    placeholder: 'CHARITY.CHANGE_PASSWORD.FIELDS.CHANGE_PASSWORD_PLACEHOLDER',
                    rules: 'required|string',
                    type: 'password'
                }
            ]
        };
    }
}