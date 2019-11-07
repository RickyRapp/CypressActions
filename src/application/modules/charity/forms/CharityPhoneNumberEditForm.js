import { FormBase } from 'core/components';

export const charityPhoneNumberFormProperties = {
    fields: [
        {
            name: 'id',
            rules: 'string'
        },
        {
            name: 'number',
            label: 'PHONE_NUMBER.EDIT.FIELDS.NUMBER_FIELD',
            rules: 'required|string',
            extra: {
                mask: '_',
                format: '(###) ###-####'
            }
        },
        {
            name: 'description',
            label: 'PHONE_NUMBER.EDIT.FIELDS.DESCRIPTION_FIELD',
            rules: 'string'
        }
    ]
}

export default class CharityPhoneNumberEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return charityPhoneNumberFormProperties;
    }
}
