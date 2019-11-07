import { FormBase } from 'core/components';
import {
    donorAccountSettingsFormProperties,
    donorAccountAddressFormProperties,
    donorAccountEmailAddressFormProperties,
    donorAccountPhoneNumberFormProperties
} from 'application/donor-account/forms';

export default class DonorAccountCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'accountTypeId',
                    label: 'DONOR_ACCOUNT.CREATE.ACCOUNT_TYPE_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'howDidYouHearAboutUsId',
                    label: 'DONOR_ACCOUNT.CREATE.HOW_DID_YOU_HEAR_ABOUT_US_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'activationUrl',
                    rules: 'string'
                },
                {
                    name: 'fundName',
                    label: 'DONOR_ACCOUNT.CREATE.FUND_NAME_LABEL',
                    rules: ['required', 'string', `regex:^The[\\-\\'\\s\\w]+Fund$`]
                },
                {
                    name: 'securityPin',
                    label: 'DONOR_ACCOUNT.CREATE.SECURITY_PIN_LABEL',
                    rules: 'required|string|digits:4'
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: 'DONOR_ACCOUNT.CREATE.DELIVERY_METHOD_TYPE_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'blankBookletMaxAmount',
                    label: 'DONOR_ACCOUNT.CREATE.BLANK_BOOKLET_MAX_LABEL',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'DONOR_ACCOUNT.CREATE.LOW_BALANCE_REMAINDER_LABEL',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'coreUser',
                    fields: [
                        {
                            name: 'firstName',
                            label: 'DONOR_ACCOUNT.CREATE.FIRST_NAME_LABEL',
                            rules: 'required|string'
                        },
                        {
                            name: 'lastName',
                            label: 'DONOR_ACCOUNT.CREATE.LAST_NAME_LABEL',
                            rules: 'required|string'
                        },
                        {
                            name: 'middleName',
                            label: 'DONOR_ACCOUNT.CREATE.MIDDLE_NAME_LABEL',
                            rules: 'string'
                        },
                        {
                            name: 'prefixTypeId',
                            label: 'DONOR_ACCOUNT.CREATE.PREFIX_TYPE_LABEL',
                            rules: 'string'
                        },
                        {
                            name: 'username',
                            label: 'DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.USERNAME_LABEL',
                            rules: 'required|email',
                            autoComplete: 'off'
                        },
                        {
                            name: 'coreMembership',
                            fields: [
                                {
                                    name: 'password',
                                    label: 'DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.PASSWORD_LABEL',
                                    rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                                    type: 'password',
                                    autoComplete: 'off'
                                },
                                {
                                    name: 'confirmPassword',
                                    label: 'DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_LABEL',
                                    rules: 'required|string|same:coreUser.coreMembership.password',
                                    type: 'password'
                                }
                            ]
                        }
                    ]
                },
                ...donorAccountSettingsFormProperties.fields,
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
        };
    }
}
