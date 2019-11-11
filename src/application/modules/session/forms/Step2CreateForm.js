import { FormBase } from 'core/components';

export default class SessionInformationCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'fullName',
                    label: 'SESSION.CREATE.STEP2.FIELDS.FULL_NAME_LABEL',
                    placeholder: 'SESSION.CREATE.STEP2.FIELDS.FULL_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'phoneNumber',
                    label: 'SESSION.CREATE.STEP2.FIELDS.PHONE_NUMBER_LABEL',
                    rules: 'required|string',
                    extra: {
                        format: '(###) ###-####'
                    }
                },
                {
                    name: 'email',
                    label: 'SESSION.CREATE.STEP2.FIELDS.EMAIL_LABEL',
                    placeholder: 'SESSION.CREATE.STEP2.FIELDS.EMAIL_PLACEHOLDER',
                    rules: 'email'
                },
                {
                    name: 'charityName',
                    label: 'SESSION.CREATE.STEP2.FIELDS.CHARITY_NAME_LABEL',
                    placeholder: 'SESSION.CREATE.STEP2.FIELDS.CHARITY_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'taxId',
                    label: 'SESSION.CREATE.STEP2.FIELDS.TAX_ID_LABEL',
                    rules: 'string',
                    extra: {
                        format: '##-########'
                    }
                },
                {
                    name: 'charityEmail',
                    label: 'SESSION.CREATE.STEP2.FIELDS.CHARITY_EMAIL_LABEL',
                    placeholder: 'SESSION.CREATE.STEP2.FIELDS.CHARITY_EMAIL_PLACEHOLDER',
                    rules: 'email'
                },
                {
                    name: 'description',
                    label: 'SESSION.CREATE.STEP2.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'SESSION.CREATE.STEP2.FIELDS.DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'key',
                    label: 'SESSION.CREATE.STEP2.FIELDS.KEY_LABEL',
                    placeholder: 'SESSION.CREATE.STEP2.FIELDS.KEY_PLACEHOLDER',
                    rules: 'numeric|digits:5'
                }
            ]
        }
    }
}