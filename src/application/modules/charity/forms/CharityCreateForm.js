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
                    name: 'contactInformation',
                    fields: [
                        {
                            name: 'name',
                            label: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'emailAddress',
                            fields: [
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
                        },
                    ]
                },
                {
                    name: 'bankAccount',
                    fields: [
                        {
                            name: 'name',
                            label: 'BANK_ACCOUNT.EDIT.FIELDS.NAME_LABEL',
                            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.NAME_PLACEHOLDER',
                            rules: 'string'
                        },
                        {
                            name: 'accountNumber',
                            label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_NUMBER_LABEL',
                            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_NUMBER_PLACEHOLDER',
                            rules: 'string'
                        },
                        {
                            name: 'routingNumber',
                            label: 'BANK_ACCOUNT.EDIT.FIELDS.ROUTING_NUMBER_LABEL',
                            rules: 'string|digits:9',
                            extra: {
                                format: '###-###-###'
                            }
                        },
                        {
                            name: 'description',
                            label: 'BANK_ACCOUNT.EDIT.FIELDS.DESCRIPTION_LABEL',
                        },
                        {
                            name: 'accountHolder',
                            fields: [
                                {
                                    name: 'address',
                                    fields: [
                                        {
                                            name: 'addressLine1',
                                            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_LABEL',
                                            placeholder: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
                                            rules: 'string'
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
                                            rules: 'string'
                                        },
                                        {
                                            name: 'state',
                                            label: 'ADDRESS.EDIT.FIELDS.STATE_LABEL',
                                            placeholder: 'ADDRESS.EDIT.FIELDS.STATE_PLACEHOLDER',
                                            rules: 'string'
                                        },
                                        {
                                            name: 'zipCode',
                                            label: 'ADDRESS.EDIT.FIELDS.ZIPCODE_LABEL',
                                            placeholder: 'ADDRESS.EDIT.FIELDS.ZIPCODE_PLACEHOLDER',
                                            rules: 'string'
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
                                            name: 'email',
                                            label: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_LABEL',
                                            placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_PLACEHOLDER',
                                            rules: 'email'
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
                                            name: 'number',
                                            label: 'PHONE_NUMBER.EDIT.FIELDS.NUMBER_LABEL',
                                            placeholder: 'PHONE_NUMBER.EDIT.FIELDS.NUMBER_PLACEHOLDER',
                                            rules: 'string',
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