import { FormBase } from 'core/components';
import {
    donorAccountAddressFormProperties,
    donorAccountEmailAddressFormProperties,
    donorAccountPhoneNumberFormProperties
} from 'application/donor-account/forms';

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
                    placeholder: 'CHARITY.CREATE.FIELDS.TAX_ID_PLACEHOLDER',
                    rules: 'required|string|size:10'
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
                    ...donorAccountAddressFormProperties
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
                            ...donorAccountEmailAddressFormProperties
                        },
                        {
                            name: 'phoneNumber',
                            ...donorAccountPhoneNumberFormProperties
                        },
                    ]
                },
                {
                    name: 'bankAccount',
                    fields: [
                        {
                            name: 'name',
                            label: 'BANK_ACCOUNT.EDIT.FIELDS.NAME_FIELD',
                            rules: 'required|string'
                        },
                        {
                            name: 'accountNumber',
                            label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_NUMBER_FIELD',
                            rules: 'required|string'
                        },
                        {
                            name: 'routingNumber',
                            label: 'BANK_ACCOUNT.EDIT.FIELDS.ROUTING_NUMBER_FIELD',
                            rules: 'required|string|digits:9'
                        },
                        {
                            name: 'description',
                            label: 'BANK_ACCOUNT.EDIT.FIELDS.DESCRIPTION_FIELD',
                        },
                        {
                            name: 'accountHolder',
                            fields: [
                                {
                                    name: 'address',
                                    ...donorAccountAddressFormProperties
                                },
                                {
                                    name: 'emailAddress',
                                    ...donorAccountEmailAddressFormProperties
                                },
                                {
                                    name: 'phoneNumber',
                                    ...donorAccountPhoneNumberFormProperties
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
                            rules: 'required|email',
                            autoComplete: 'off'
                        },
                        {
                            name: 'coreMembership',
                            fields: [
                                {
                                    name: 'password',
                                    label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.PASSWORD_LABEL',
                                    rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                                    type: 'password',
                                    autoComplete: 'off'
                                },
                                {
                                    name: 'confirmPassword',
                                    label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_LABEL',
                                    rules: 'required|string|same:coreUser.coreMembership.password',
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