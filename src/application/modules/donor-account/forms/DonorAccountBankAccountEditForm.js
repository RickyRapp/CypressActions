import { FormBase } from 'core/components';

export const donorAccountBankAccountFormProperties = {
    fields: [
        {
            name: 'id',
            rules: 'string'
        },
        {
            name: 'name',
            label: 'BANK_ACCOUNT.EDIT.FIELDS.NAME_LABEL',
            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.NAME_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'accountNumber',
            label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_NUMBER_LABEL',
            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_NUMBER_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'routingNumber',
            label: 'BANK_ACCOUNT.EDIT.FIELDS.ROUTING_NUMBER_LABEL',
            rules: 'required|string|digits:9',
            extra: {
                mask: '_',
                format: '###-###-###'
            }
        },
        {
            name: 'description',
            label: 'BANK_ACCOUNT.EDIT.FIELDS.DESCRIPTION_LABEL',
            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
        },
        {
            name: 'isThirdPartyAccount',
            label: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_BANK_ACCOUNT_LABEL',
            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_BANK_ACCOUNT_PLACEHOLDER',
            rules: 'boolean',
            type: 'checkbox'
        },
        {
            name: 'accountHolder',
            fields: [
                {
                    name: 'name',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_ACCOUNT_HOLDER_NAME_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_ACCOUNT_HOLDER_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'address',
                    fields: [
                        {
                            name: 'id',
                            rules: 'string'
                        },
                        {
                            name: 'addressLine1',
                            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_LABEL',
                            placeholder: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'addressLine2',
                            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_LABEL',
                            placeholder: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_PLACEHOLDER',
                            rules: 'string'
                        },
                        {
                            name: 'city',
                            label: 'ADDRESS.EDIT.FIELDS.CITY_LABEL',
                            placeholder: 'ADDRESS.EDIT.FIELDS.CITY_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'state',
                            label: 'ADDRESS.EDIT.FIELDS.STATE_LABEL',
                            placeholder: 'ADDRESS.EDIT.FIELDS.STATE_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'zipCode',
                            label: 'ADDRESS.EDIT.FIELDS.ZIPCODE_LABEL',
                            placeholder: 'ADDRESS.EDIT.FIELDS.ZIPCODE_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'description',
                            label: 'ADDRESS.EDIT.FIELDS.DESCRIPTION_LABEL',
                            placeholder: 'ADDRESS.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
                            rules: 'string'
                        }
                    ]
                },
                {
                    name: 'emailAddress',
                    fields: [
                        {
                            name: 'id',
                            rules: 'string'
                        },
                        {
                            name: 'email',
                            label: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_LABEL',
                            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_PLACEHOLDER',
                            rules: 'required|email'
                        },
                        {
                            name: 'description',
                            label: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_LABEL',
                            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
                            rules: 'string'
                        }
                    ]
                },
                {
                    name: 'phoneNumber',
                    fields: [
                        {
                            name: 'id',
                            rules: 'string'
                        },
                        {
                            name: 'number',
                            label: 'PHONE_NUMBER.EDIT.FIELDS.NUMBER_LABEL',
                            rules: 'required|string',
                            extra: {
                                format: '(###) ###-####'
                            }
                        },
                        {
                            name: 'description',
                            label: 'PHONE_NUMBER.EDIT.FIELDS.DESCRIPTION_LABEL',
                            placeholder: 'PHONE_NUMBER.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
                            rules: 'string'
                        }
                    ]
                }
            ]
        }
    ]
}

export default class DonorAccountBankAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return donorAccountBankAccountFormProperties;
    }
}
