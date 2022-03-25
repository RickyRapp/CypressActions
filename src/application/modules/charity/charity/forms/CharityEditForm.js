import { FormBase } from 'core/components';

export default class CharityEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'CHARITY.EDIT.FIELDS.NAME_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.NAME_PLACEHOLDER',
                    rules: 'string',
                    disabled: true
                },
                {
                    name: 'dba',
                    label: 'CHARITY.EDIT.FIELDS.DBA_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.DBA_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'url',
                    label: 'CHARITY.EDIT.FIELDS.URL_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.URL_PLACEHOLDER',
                    rules: 'string|url'
                },
                {
                    name: 'charityTypeId',
                    label: 'CHARITY.EDIT.FIELDS.CHARITY_TYPE_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.CHARITY_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'charityStatusId',
                    label: 'CHARITY.EDIT.FIELDS.CHARITY_STATUS_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.CHARITY_STATUS_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'contactInformationName',
                    label: 'CHARITY.EDIT.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'contactInformationEmail',
                    label: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_LABEL',
                    placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_PLACEHOLDER',
                    rules: 'required|email'
                },
                {
                    name: 'contactInformationNumber',
                    label: 'PHONE_NUMBER.EDIT.FIELDS.NUMBER_LABEL',
                    rules: 'required|string',
                    extra: {
                        format: '(###) ###-####'
                    }
                },
                {
                    name: 'description',
                    label: 'CHARITY.DESCRIPTION.FIELDS.CHANGE_DESCRIPTION_LABEL',
                    placeholder: 'CHARITY.DESCRIPTION.FIELDS.CHANGE_DESCRIPTION_PLACEHOLDER',
                    rules: 'string',
                    type: "text"
                }
            ]
        };
    }
}