import { FormBase } from 'core/components';

export const charityEmailAddressFormProperties = {
    fields: [
        {
            name: 'id',
            rules: 'string'
        },
        {
            name: 'email',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_LABEL',
            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_PLACEHOLDER',
            rules: 'required|email'
        },
        {
            name: 'description',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_LABEL',
            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
            rules: 'string'
        }
    ]
}

export default class CharityEmailAddressEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return charityEmailAddressFormProperties;
    }
}
