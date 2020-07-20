import { FormBase } from 'core/components';
import moment from 'moment';

export default class ContributionCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    rules: 'string'
                },
                {
                    name: 'donorId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: 'CONTRIBUTION.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'paymentTypeId',
                    label: 'CONTRIBUTION.CREATE.FIELDS.PAYMENT_TYPE_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'bankAccountId',
                    label: 'CONTRIBUTION.CREATE.FIELDS.BANK_ACCOUNT_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.BANK_ACCOUNT_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'checkNumber',
                    label: 'CONTRIBUTION.CREATE.FIELDS.CHECK_NUMBER_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.CHECK_NUMBER_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'payerInformation',
                    fields: [
                        {
                            name: 'name',
                            label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_NAME_LABEL',
                            placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_NAME_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'addressLine1',
                            label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ADDRESS_LINE_1_LABEL',
                            placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ADDRESS_LINE_1_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'addressLine2',
                            label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ADDRESS_LINE_2_LABEL',
                            placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ADDRESS_LINE_2_PLACEHOLDER',
                            rules: 'string'
                        },
                        {
                            name: 'city',
                            label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_CITY_LABEL',
                            placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_CITY_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'state',
                            label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_STATE_LABEL',
                            placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_STATE_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'zipCode',
                            label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ZIPCODE_LABEL',
                            placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ZIPCODE_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'email',
                            label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_EMAIL_LABEL',
                            placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_EMAIL_PLACEHOLDER',
                            rules: 'required|email'
                        },
                        {
                            name: 'number',
                            label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_NUMBER_LABEL',
                            rules: 'required|string',
                            extra: {
                                format: '(###) ###-####'
                            }
                        },
                    ]
                },
                {
                    name: 'financialInstitution',
                    label: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionAddressLine1',
                    label: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_ADDRESS_LINE_1_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionAddressLine2',
                    label: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_ADDRESS_LINE_2_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionCity',
                    label: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_CITY_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_CITY_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionState',
                    label: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_STATE_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_STATE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionZipCode',
                    label: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_ZIP_CODE_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_ZIP_CODE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionPhoneNumber',
                    label: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_PHONE_NUMBER_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.FINANCIAL_INSTITUTION_PHONE_NUMBER_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'accountNumber',
                    label: 'CONTRIBUTION.CREATE.FIELDS.ACCOUNT_NUMBER_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.ACCOUNT_NUMBER_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'securityType',
                    label: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_TYPE_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'securitySymbol',
                    label: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_SYMBOL_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_SYMBOL_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'numberOfShares',
                    label: 'CONTRIBUTION.CREATE.FIELDS.NUMBER_OF_SHARES_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.NUMBER_OF_SHARES_PLACEHOLDER',
                    rules: 'numeric|min:0'
                },
                {
                    name: 'estimatedValue',
                    label: 'CONTRIBUTION.CREATE.FIELDS.ESTIMATED_VALUE_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.ESTIMATED_VALUE_PLACEHOLDER',
                    rules: 'numeric|min:10000'
                },
                {
                    name: 'transactionId',
                    label: 'CONTRIBUTION.CREATE.FIELDS.TRANSACTION_ID_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.TRANSACTION_ID_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'memo',
                    label: 'CONTRIBUTION.CREATE.FIELDS.MEMO_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.MEMO_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'contributionSettingTypeId',
                    label: 'CONTRIBUTION.CREATE.FIELDS.SETTING_TYPE_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.SETTING_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'settingStartDate',
                    label: 'CONTRIBUTION.CREATE.FIELDS.SETTING_START_DATE_LABEL',
                    placeholder: 'CONTRIBUTION.CREATE.FIELDS.SETTING_START_DATE_PLACEHOLDER',
                    rules: `min_date:${moment().format('YYYY-MM-DD')}`,
                    type: 'date'
                }
            ],
        };
    }
}