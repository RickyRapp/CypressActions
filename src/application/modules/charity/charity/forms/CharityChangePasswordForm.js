import { FormBase } from 'core/components';

export default class CharityChangePasswordForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'charityPassword',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                }
            ]
        };
    }
}