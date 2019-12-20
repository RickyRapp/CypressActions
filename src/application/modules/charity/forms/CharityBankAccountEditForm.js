import { FormBase } from 'core/components';

export const charityBankAccountFormProperties = {
    fields: [
        {
            name: 'name',
            label: 'CHARITY.EDIT.FIELDS.BANK_ACCOUNT_NAME_LABEL',
            placeholder: 'CHARITY.EDIT.FIELDS.BANK_ACCOUNT_NAME_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'accountNumber',
            label: 'CHARITY.EDIT.FIELDS.BANK_ACCOUNT_ACCOUNT_NUMBER_LABEL',
            placeholder: 'CHARITY.EDIT.FIELDS.BANK_ACCOUNT_ACCOUNT_NUMBER_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'routingNumber',
            label: 'CHARITY.EDIT.FIELDS.BANK_ACCOUNT_ROUTING_NUMBER_LABEL',
            placeholder: 'CHARITY.EDIT.FIELDS.BANK_ACCOUNT_ROUTING_NUMBER_PLACEHOLDER',
            rules: 'required|string|digits:9',
            extra: {
                format: '###-###-###'
            }
        },
        {
            name: 'accountHolder',
            label: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_TITLE',
            fields: [
                {
                    name: 'addressLine1',
                    label: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'addressLine2',
                    label: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_2_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'city',
                    label: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_CITY_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_CITY_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'state',
                    label: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_STATE_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_STATE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'zipCode',
                    label: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_ZIPCODE_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_ZIPCODE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'email',
                    label: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_EMAIL_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.ACCOUNT_HOLDER_EMAIL_PLACEHOLDER',
                    rules: 'required|email'
                },
            ]
        }
    ]
}

export default class CharityBankAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return charityBankAccountFormProperties;
    }
}
