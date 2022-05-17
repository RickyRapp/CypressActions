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
                    name: 'isPrimary',
                    label: 'Is primary?',
                    rules: 'boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'isDisabled',
                    label: 'Is disabled?',
                    rules: 'boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'accountHolderName',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_ACCOUNT_HOLDER_NAME_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_ACCOUNT_HOLDER_NAME_PLACEHOLDER',
                    rules: 'string'
                },

                {
                    name: 'addressLine1',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'string'
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
                    rules: 'required|string'
                },
                {
                    name: 'state',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_STATE_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_STATE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'zipCode',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ZIPCODE_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_ZIPCODE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'email',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_EMAIL_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_HOLDER_EMAIL_PLACEHOLDER',
                    rules: 'required|email',
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
                    rules: 'required|string',
                    extra: {
                        format: '(###) ###-####'
                    }
                }
            ]
        }
    }
}