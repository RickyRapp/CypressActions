import { FormBase } from 'core/components';

export const donorAccountPhoneNumberFormProperties = {
    fields: [
        {
            name: 'id',
            rules: 'string'
        },
        {
            name: 'number',
            label: 'PHONE_NUMBER.EDIT.FIELDS.NUMBER_FIELD_LABEL',
            placeholder: 'PHONE_NUMBER.EDIT.FIELDS.NUMBER_FIELD_PLACEHOLDER',
            rules: 'required|string',
            extra: {
                format: '(###) ###-####'
            }
        },
        {
            name: 'description',
            label: 'PHONE_NUMBER.EDIT.FIELDS.DESCRIPTION_FIELD_LABEL',
            placeholder: 'PHONE_NUMBER.EDIT.FIELDS.DESCRIPTION_FIELD_PLACEHOLDER',
            rules: 'string'
        }
    ]
}

export default class DonorAccountPhoneNumberEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return donorAccountPhoneNumberFormProperties;
    }
}
