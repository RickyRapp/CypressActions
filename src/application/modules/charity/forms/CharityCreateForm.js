import { FormBase } from 'core/components';

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
                    rules: 'required|string|size:9',
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
                    name: 'address',
                    fields: [
                        {
                            name: 'addressLine1',
                            label: 'CHARITY.CREATE.FIELDS.ADDRESS_LINE_1_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'addressLine2',
                            label: 'CHARITY.CREATE.FIELDS.ADDRESS_LINE_2_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.ADDRESS_LINE_2_PLACEHOLDER',
                            rules: 'string'
                        },
                        {
                            name: 'city',
                            label: 'CHARITY.CREATE.FIELDS.CITY_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.CITY_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'state',
                            label: 'CHARITY.CREATE.FIELDS.STATE_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.STATE_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'zipCode',
                            label: 'CHARITY.CREATE.FIELDS.ZIPCODE_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.ZIPCODE_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'description',
                            label: 'CHARITY.CREATE.FIELDS.DESCRIPTION_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.DESCRIPTION_PLACEHOLDER',
                            rules: 'string'
                        }
                    ]
                },
                {
                    name: 'contactInformation',
                    fields: [
                        {
                            name: 'name',
                            label: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'email',
                            label: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_PLACEHOLDER',
                            rules: 'required|email'
                        },
                        {
                            name: 'number',
                            label: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NUMBER_LABEL',
                            rules: 'required|string',
                            extra: {
                                format: '(###) ###-####'
                            }
                        }
                    ]
                },
                {
                    name: 'bankAccount',
                    fields: [
                        {
                            name: 'name',
                            label: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_NAME_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_NAME_PLACEHOLDER',
                            rules: 'string'
                        },
                        {
                            name: 'accountNumber',
                            label: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_ACCOUNT_NUMBER_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_ACCOUNT_NUMBER_PLACEHOLDER',
                            rules: 'string'
                        },
                        {
                            name: 'routingNumber',
                            label: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_ROUTING_NUMBER_LABEL',
                            rules: 'string|digits:9',
                            extra: {
                                format: '###-###-###'
                            }
                        },
                        {
                            name: 'description',
                            label: 'CHARITY.CREATE.FIELDS.DESCRIPTION_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.BANK_ACCOUNT_DESCRIPTION_LABEL',
                        },
                        {
                            name: 'accountHolder',
                            fields: [
                                {
                                    name: 'addressLine1',
                                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_1_PLACEHOLDER',
                                    rules: 'string'
                                },
                                {
                                    name: 'addressLine2',
                                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_2_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ADDRESS_LINE_2_PLACEHOLDER',
                                    rules: 'string'
                                },
                                {
                                    name: 'city',
                                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_CITY_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_CITY_PLACEHOLDER',
                                    rules: 'string'
                                },
                                {
                                    name: 'state',
                                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_STATE_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_STATE_PLACEHOLDER',
                                    rules: 'string'
                                },
                                {
                                    name: 'zipCode',
                                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ZIPCODE_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_ZIPCODE_PLACEHOLDER',
                                    rules: 'string'
                                },
                                {
                                    name: 'email',
                                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_EMAIL_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_EMAIL_PLACEHOLDER',
                                    rules: 'email'
                                },
                                {
                                    name: 'number',
                                    label: 'CHARITY.CREATE.FIELDS.ACCOUNT_HOLDER_NUMBER_LABEL',
                                    rules: 'string',
                                    extra: {
                                        format: '(###) ###-####'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'coreUser',
                    fields: [
                        {
                            name: 'username',
                            label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.USERNAME_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.USERNAME_PLACEHOLDER',
                            rules: 'email',
                            autoComplete: 'off'
                        },
                        {
                            name: 'coreMembership',
                            fields: [
                                {
                                    name: 'password',
                                    label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.PASSWORD_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.PASSWORD_PLACEHOLDER',
                                    rules: ['string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                                    type: 'password',
                                    autoComplete: 'off'
                                },
                                {
                                    name: 'confirmPassword',
                                    label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_PLACEHOLDER',
                                    rules: 'string|same:coreUser.coreMembership.password',
                                    type: 'password'
                                }
                            ]
                        }
                    ]
                },
            ],
        };
    }
}