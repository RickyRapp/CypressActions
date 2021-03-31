import { FormBase } from 'core/components';

export default class SessionCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'key',
                    rules: 'numeric'
                },
                {
                    name: 'charityId',
                    label: 'SESSION.EDIT.FIELDS.CHARITY_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.CHARITY_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'language',
                    label: 'SESSION.EDIT.FIELDS.FULL_NAME_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.FULL_NAME_PLACEHOLDER',
                    rules: 'string',
                    value: 'eng'
                },
                {
                    name: 'fullName',
                    label: 'SESSION.EDIT.FIELDS.FULL_NAME_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.FULL_NAME_PLACEHOLDER',
                    rules: 'required|string|max:25'
                },
                {
                    name: 'phoneNumber',
                    label: 'SESSION.EDIT.FIELDS.PHONE_NUMBER_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.PHONE_NUMBER_PLACEHOLDER',
                    rules: 'required|string',
                    extra: {
                        format: '(###) ###-####'
                    }
                },
                {
                    name: 'email',
                    label: 'SESSION.EDIT.FIELDS.EMAIL_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.EMAIL_PLACEHOLDER',
                    rules: 'email'
                },
                {
                    name: 'description',
                    label: 'SESSION.EDIT.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'addressLine1',
                    label: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_1_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'required|string',
                },
                {
                    name: 'addressLine2',
                    label: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_2_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string',
                },
                {
                    name: 'city',
                    label: 'ADDRESS.CREATE.FIELDS.CITY_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.CITY_PLACEHOLDER',
                    rules: 'required|string',
                },
                {
                    name: 'state',
                    label: 'ADDRESS.CREATE.FIELDS.STATE_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.STATE_PLACEHOLDER',
                    rules: 'required|string',
                },
                {
                    name: 'zipCode',
                    label: 'ADDRESS.CREATE.FIELDS.ZIPCODE_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.ZIPCODE_PLACEHOLDER',
                    rules: 'required|string',
                },
            ]
        };
    }
}