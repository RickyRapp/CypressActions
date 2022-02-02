import { FormBase } from 'core/components';

export default class CharityBankAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
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
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ROUTING_NUMBER_PLACEHOLDER',
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
                    name: 'coreMediaVaultEntryId',
                    rules: 'string'
                },
                {
                    name: 'isThirdPartyAccount',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_BANK_ACCOUNT_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_BANK_ACCOUNT_PLACEHOLDER',
                    rules: 'boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'donorBankAccountId',
                    label: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.BANK_ACCOUNT_LABEL',
                    placeholder: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.BANK_ACCOUNT_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'accountHolderName',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_ACCOUNT_HOLDER_NAME_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_ACCOUNT_HOLDER_NAME_PLACEHOLDER',
                    rules: 'required_if:isThirdPartyAccount,true|string'
                },

                {
                    name: 'addressLine1',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'required_if:isThirdPartyAccount,true|string'
                },
                {
                    name: 'addressLine2',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_2_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'city',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_CITY_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_CITY_PLACEHOLDER',
                    rules: 'required_if:isThirdPartyAccount,true|string'
                },
                {
                    name: 'state',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_STATE_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_STATE_PLACEHOLDER',
                    rules: 'required_if:isThirdPartyAccount,true|string'
                },
                {
                    name: 'zipCode',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ZIPCODE_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ZIPCODE_PLACEHOLDER',
                    rules: 'required_if:isThirdPartyAccount,true|string'
                },
                {
                    name: 'email',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_EMAIL_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_EMAIL_PLACEHOLDER',
                    rules: 'required_if:isThirdPartyAccount,true|email',
                    options: {
                        validateOnChange: false
                    },
                    handlers: {
                        onBlur: (field) => () => {
                            field.validate({ showErrors: true });
                        }
                    }
                },
                {
                    name: 'number',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_NUMBER_LABEL',
                    rules: 'required_if:isThirdPartyAccount,true|string',
                    extra: {
                        format: '(###) ###-####'
                    }
                }
            ]
        }
    }
}