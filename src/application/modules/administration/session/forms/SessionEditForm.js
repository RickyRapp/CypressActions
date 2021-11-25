import { FormBase } from 'core/components';

export default class SessionEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'charityName',
                    label: 'SESSION.EDIT.FIELDS.CHARITY_NAME_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.CHARITY_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'fullName',
                    label: 'SESSION.EDIT.FIELDS.FULL_NAME_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.FULL_NAME_PLACEHOLDER',
                    rules: 'required|string'
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
                    name: 'addressLine1',
                    label: 'SESSION.EDIT.FIELDS.ADDRESS_LINE_1_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'addressLine2',
                    label: 'SESSION.EDIT.FIELDS.ADDRESS_LINE_2_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'city',
                    label: 'SESSION.EDIT.FIELDS.CITY_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.CITY_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'state',
                    label: 'SESSION.EDIT.FIELDS.STATE_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.STATE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'zipCode',
                    label: 'SESSION.EDIT.FIELDS.ZIPCODE_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.ZIPCODE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'description',
                    label: 'SESSION.EDIT.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}