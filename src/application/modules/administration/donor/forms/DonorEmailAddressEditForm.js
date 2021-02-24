import { FormBase } from 'core/components';

export const donorEmailAddressFormProperties = {
    fields: [
        {
            name: 'id',
            rules: 'string'
        },
        {
            name: 'email',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_LABEL',
            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_PLACEHOLDER',
            rules: 'required|email',
            options: {
                validateOnChange: false
            },
            handlers: {
                onBlur: (field) => () => {
                    field.validate({ showErrors: true });
                }
            }
        },
        {
            name: 'description',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_LABEL',
            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
            rules: 'string'
        },
        {
            name: 'isPrimary',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.PRIMARY_LABEL',
            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.PRIMARY_PLACEHOLDER',
            rules: 'boolean',
            type: 'checkbox'
        },
        {
            name: 'isNotifyEnabled',
            label: 'EMAIL_ADDRESS.EDIT.FIELDS.NOTIFY_LABEL',
            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.NOTIFY_PLACEHOLDER',
            rules: 'boolean',
            type: 'checkbox'
        }
    ]
}

export default class DonorEmailAddressEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return donorEmailAddressFormProperties;
    }
}
