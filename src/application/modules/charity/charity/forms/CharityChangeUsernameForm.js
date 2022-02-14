import { FormBase } from 'core/components';

export default class CharityChangeUsernameForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'charityChangeUsername',
                    label: 'CHARITY.CHANGE_USERNAME.FIELDS.CHANGE_USERNAME_LABEL',
                    placeholder: 'CHARITY.CHANGE_USERNAME.FIELDS.CHANGE_USERNAME_PLACEHOLDER',
                    rules: 'required|string'
                }
            ]
        };
    }
}