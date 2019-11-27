import { FormBase } from 'core/components';

export const donorAccountEmailAddressFormProperties = {
    fields: [
        {
            name: 'id',
            rules: 'string'
        },
        {
            name: 'email',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_FIELD_LABEL',
            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_FIELD_PLACEHOLDER',
            rules: 'required|email'
        },
        {
            name: 'description',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_FIELD_LABEL',
            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_FIELD_PLACEHOLDER',
            rules: 'string'
        }
    ]
}

export default class DonorAccountEmailAddressEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return donorAccountEmailAddressFormProperties;
    }
}
