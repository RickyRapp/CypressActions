import { FormBase } from 'core/components';
import {
    donorAccountSettingsFormProperties
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
                    placeholder: 'DONOR_ACCOUNT.CREATE.ACCOUNT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'howDidYouHearAboutUsId',
                    label: 'DONOR_ACCOUNT.CREATE.HOW_DID_YOU_HEAR_ABOUT_US_LABEL',
                    placeholder: 'DONOR_ACCOUNT.CREATE.HOW_DID_YOU_HEAR_ABOUT_US_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'activationUrl',
                    rules: 'string'
                },
                {
                    name: 'fundName',
                    label: 'DONOR_ACCOUNT.CREATE.FUND_NAME_LABEL',
                    placeholder: 'DONOR_ACCOUNT.CREATE.FUND_NAME_PLACEHOLDER',
                    rules: ['required', 'string', `regex:^The[\\-\\'\\s\\w]+Fund$`]
                },
                {
                    name: 'securityPin',
                    label: 'DONOR_ACCOUNT.CREATE.SECURITY_PIN_LABEL',
                    rules: 'required|string|digits:4',
                    extra: {
                        format: '####'
                    }
                },
                {
                    name: 'blankBookletMaxAmount',
                    label: 'DONOR_ACCOUNT.CREATE.BLANK_BOOKLET_MAX_LABEL',
                    placeholder: 'DONOR_ACCOUNT.CREATE.BLANK_BOOKLET_MAX_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'DONOR_ACCOUNT.CREATE.LOW_BALANCE_REMAINDER_LABEL',
                    placeholder: 'DONOR_ACCOUNT.CREATE.LOW_BALANCE_REMAINDER_PLACEHOLDER',
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
                            placeholder: 'DONOR_ACCOUNT.CREATE.FIRST_NAME_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'lastName',
                            label: 'DONOR_ACCOUNT.CREATE.LAST_NAME_LABEL',
                            placeholder: 'DONOR_ACCOUNT.CREATE.LAST_NAME_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'middleName',
                            label: 'DONOR_ACCOUNT.CREATE.MIDDLE_NAME_LABEL',
                            placeholder: 'DONOR_ACCOUNT.CREATE.MIDDLE_NAME_PLACEHOLDER',
                            rules: 'string'
                        },
                        {
                            name: 'prefixTypeId',
                            label: 'DONOR_ACCOUNT.CREATE.PREFIX_TYPE_LABEL',
                            placeholder: 'DONOR_ACCOUNT.CREATE.PREFIX_TYPE_PLACEHOLDER',
                            rules: 'string'
                        },
                        {
                            name: 'username',
                            label: 'DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.USERNAME_LABEL',
                            placeholder: 'DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.USERNAME_PLACEHOLDER',
                            rules: 'email',
                            autoComplete: 'off'
                        },
                        {
                            name: 'coreMembership',
                            fields: [
                                {
                                    name: 'password',
                                    label: 'DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.PASSWORD_LABEL',
                                    placeholder: 'DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.PASSWORD_PLACEHOLDER',
                                    rules: ['string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                                    type: 'password',
                                    autoComplete: 'off'
                                },
                                {
                                    name: 'confirmPassword',
                                    label: 'DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_LABEL',
                                    placeholder: 'DONOR_ACCOUNT.CREATE.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_PLACEHOLDER',
                                    rules: 'string|same:coreUser.coreMembership.password',
                                    type: 'password'
                                }
                            ]
                        }
                    ]
                },
                ...donorAccountSettingsFormProperties.fields,
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
                }
            ]
        };
    }
}
