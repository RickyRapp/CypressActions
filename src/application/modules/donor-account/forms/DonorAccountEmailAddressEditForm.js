import { FormBase } from 'core/components';

export const donorAccountEmailAddressFormProperties = {
    fields: [
        {
            name: 'id',
            rules: 'string'
        },
        {
            name: 'email',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_FIELD',
            rules: 'required|email'
        },
        {
            name: 'description',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_FIELD',
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
