import { FormBase } from 'core/components';

export const donorPhoneNumberFormProperties = {
    fields: [
        {
            name: 'number',
            label: 'PHONE_NUMBER.EDIT.FIELDS.NUMBER_LABEL',
            rules: 'required|string',
            extra: {
                format: '(###) ###-####'
            }
        },
        {
            name: 'isPrimary',
            label: 'PHONE_NUMBER.EDIT.FIELDS.PRIMARY_LABEL',
            placeholder: 'PHONE_NUMBER.EDIT.FIELDS.PRIMARY_PLACEHOLDER',
            rules: 'boolean',
            type: 'checkbox'
        },
        {
            name: 'description',
            label: 'PHONE_NUMBER.EDIT.FIELDS.DESCRIPTION_LABEL',
            placeholder: 'PHONE_NUMBER.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
            rules: 'string'
        }
    ]
}

export default class DonorPhoneNumberEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return donorPhoneNumberFormProperties;
    }
}