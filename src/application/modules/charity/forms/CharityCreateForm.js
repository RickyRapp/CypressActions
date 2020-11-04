import { FormBase } from 'core/components';
import moment from 'moment';

export default class CharityCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'CHARITY.CREATE.FIELDS.NAME_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'taxId',
                    label: 'CHARITY.CREATE.FIELDS.TAX_ID_LABEL',
                    rules: 'required|string|size:9|taxIdUnique',
                    options: {
                        validateOnChange: false
                    },
                    extra: {
                        format: '##-#######'
                    }
                },
                {
                    name: 'dba',
                    label: 'CHARITY.CREATE.FIELDS.DBA_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.DBA_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityTypeId',
                    label: 'CHARITY.CREATE.FIELDS.CHARITY_TYPE_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CHARITY_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'charityStatusId',
                    label: 'CHARITY.CREATE.FIELDS.CHARITY_STATUS_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CHARITY_STATUS_PLACEHOLDER',
                    rules: 'required|string'
                },
                {

                    name: 'addressAddressLine1',
                    label: 'CHARITY.CREATE.FIELDS.ADDRESS_LINE_1_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'addressAddressLine2',
                    label: 'CHARITY.CREATE.FIELDS.ADDRESS_LINE_2_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'addressCity',
                    label: 'CHARITY.CREATE.FIELDS.CITY_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CITY_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'addressState',
                    label: 'CHARITY.CREATE.FIELDS.STATE_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.STATE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'addressZipCode',
                    label: 'CHARITY.CREATE.FIELDS.ZIPCODE_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.ZIPCODE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'addressDescription',
                    label: 'CHARITY.CREATE.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'contactInformationName',
                    label: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'contactInformationEmail',
                    label: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_PLACEHOLDER',
                    rules: 'required|email'
                },
                {
                    name: 'contactInformationNumber',
                    label: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NUMBER_LABEL',
                    rules: 'required|string',
                    extra: {
                        format: '(###) ###-####'
                    }
                },
                {
                    name: 'isNewBankAccount',
                    label: 'CHARITY.CREATE.FIELDS.IS_NEW_BANK_ACCOUNT_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.IS_NEW_BANK_ACCOUNT_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'bankAccountName',
                    label: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_NAME_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_NAME_PLACEHOLDER',
                    rules: 'required_if:isNewBankAccount,true|string',
                    disabled: true
                },
                {
                    name: 'bankAccountAccountNumber',
                    label: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_ACCOUNT_NUMBER_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_ACCOUNT_NUMBER_PLACEHOLDER',
                    rules: 'required_if:isNewBankAccount,true|string',
                    disabled: true
                },
                {
                    name: 'bankAccountRoutingNumber',
                    label: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_ROUTING_NUMBER_LABEL',
                    rules: 'required_if:isNewBankAccount,true|string|digits:9',
                    extra: {
                        format: '###-###-###'
                    },
                    disabled: true
                },
                {
                    name: 'bankAccountDescription',
                    label: 'CHARITY.CREATE.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_DESCRIPTION_LABEL',
                    disabled: true
                },
                {
                    name: 'bankAccountAccountHolderAddressLine1',
                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'required_if:isNewBankAccount,true|string',
                    disabled: true
                },
                {
                    name: 'bankAccountAccountHolderAddressLine2',
                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_2_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string',
                    disabled: true
                },
                {
                    name: 'bankAccountAccountHolderCity',
                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_CITY_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_CITY_PLACEHOLDER',
                    rules: 'required_if:isNewBankAccount,true|string',
                    disabled: true
                },
                {
                    name: 'bankAccountAccountHolderState',
                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_STATE_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_STATE_PLACEHOLDER',
                    rules: 'required_if:isNewBankAccount,true|string',
                    disabled: true
                },
                {
                    name: 'bankAccountAccountHolderZipCode',
                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ZIPCODE_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ZIPCODE_PLACEHOLDER',
                    rules: 'required_if:isNewBankAccount,true|string',
                    disabled: true
                },
                {
                    name: 'bankAccountAccountHolderEmail',
                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_EMAIL_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_EMAIL_PLACEHOLDER',
                    rules: 'required_if:isNewBankAccount,true|email',
                    disabled: true
                },
                {
                    name: 'bankAccountAccountHolderNumber',
                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_NUMBER_LABEL',
                    rules: 'required_if:isNewBankAccount,true|string',
                    extra: {
                        format: '(###) ###-####'
                    },
                    disabled: true
                },
                {
                    name: 'coreMediaVaultEntryId',
                    rules: 'string',
                    disabled: true
                },
                {
                    name: 'isNewOnlineAccount',
                    label: 'CHARITY.CREATE.FIELDS.IS_ONLINE_ACCOUNT_ENABLED_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.IS_ONLINE_ACCOUNT_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'username',
                    label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.USERNAME_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.USERNAME_PLACEHOLDER',
                    rules: 'required_if:isNewOnlineAccount,true|email|usernameUnique',
                    autoComplete: 'off',
                    disabled: true,
                    options: {
                        validateOnChange: false
                    }
                },
                {
                    name: 'password',
                    label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.PASSWORD_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.PASSWORD_PLACEHOLDER',
                    rules: ['required_if:isNewOnlineAccount,true', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                    type: 'password',
                    autoComplete: 'off',
                    disabled: true
                },
                {
                    name: 'confirmPassword',
                    label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_PLACEHOLDER',
                    rules: 'string|same:password',
                    type: 'password',
                    disabled: true
                }
            ]
        };
    }
}