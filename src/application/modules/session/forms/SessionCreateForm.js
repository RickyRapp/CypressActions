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
                    rules: 'required|string'
                },
                {
                    name: 'phoneNumber',
                    label: 'SESSION.EDIT.FIELDS.PHONE_NUMBER_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.PHONE_NUMBER_PLACEHOLDER',
                    rules: 'required|string'
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
                }
            ]
        };
    }
}