import { FormBase } from 'core/components';
import moment from 'moment';

export default class DonorCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'howDidYouHearAboutUsId',
                    label: 'DONOR.CREATE.HOW_DID_YOU_HEAR_ABOUT_US_LABEL',
                    placeholder: 'DONOR.CREATE.HOW_DID_YOU_HEAR_ABOUT_US_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'howDidYouHearAboutUsDescription',
                    label: 'DONOR.CREATE.HOW_DID_YOU_HEAR_ABOUT_US_DESCRIPTION_LABEL',
                    placeholder: 'DONOR.CREATE.HOW_DID_YOU_HEAR_ABOUT_US_DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'dateOfBirth',
                    label: 'DONOR.CREATE.DATE_OF_BIRTH_LABEL',
                    placeholder: 'DONOR.CREATE.DATE_OF_BIRTH_PLACEHOLDER',
                    rules: `required|before_or_equal_date:${moment().format('YYYY-MM-DD')}`,
                    type: 'date'
                },
                {
                    name: 'activationUrl',
                    rules: 'string'
                },
                {
                    name: 'fundName',
                    label: 'DONOR.CREATE.FUND_NAME_LABEL',
                    placeholder: 'DONOR.CREATE.FUND_NAME_PLACEHOLDER',
                    rules: ['required', 'string', `regex:^The[\\-\\'\\s\\w]+Fund$`]
                },
                {
                    name: 'securityPin',
                    label: 'DONOR.CREATE.SECURITY_PIN_LABEL',
                    rules: 'required|string|digits:4',
                    extra: {
                        format: '####'
                    }
                },
                {
                    name: 'firstName',
                    label: 'DONOR.CREATE.FIRST_NAME_LABEL',
                    placeholder: 'DONOR.CREATE.FIRST_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'lastName',
                    label: 'DONOR.CREATE.LAST_NAME_LABEL',
                    placeholder: 'DONOR.CREATE.LAST_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'prefixTypeId',
                    label: 'DONOR.CREATE.PREFIX_TYPE_LABEL',
                    placeholder: 'DONOR.CREATE.PREFIX_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'username',
                    label: 'DONOR.CREATE.LOGIN_FORM_FIELDS.USERNAME_LABEL',
                    placeholder: 'DONOR.CREATE.LOGIN_FORM_FIELDS.USERNAME_PLACEHOLDER',
                    rules: 'email',
                    autoComplete: 'off',
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
                    name: 'password',
                    label: 'DONOR.CREATE.LOGIN_FORM_FIELDS.PASSWORD_LABEL',
                    placeholder: 'DONOR.CREATE.LOGIN_FORM_FIELDS.PASSWORD_PLACEHOLDER',
                    rules: ['string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                    type: 'password',
                    autoComplete: 'off'
                },
                {
                    name: 'confirmPassword',
                    label: 'DONOR.CREATE.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_LABEL',
                    placeholder: 'DONOR.CREATE.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_PLACEHOLDER',
                    rules: 'string|same:password',
                    type: 'password'
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
                    name: 'addressDescription',
                    label: 'ADDRESS.EDIT.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'ADDRESS.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'email',
                    label: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_LABEL',
                    placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.EMAIL_PLACEHOLDER',
                    rules: 'required|email'
                },
                {
                    name: 'emailAddressDescription',
                    label: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'EMAIL_ADDRESS.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
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
                    name: 'phoneNumberDescription',
                    label: 'PHONE_NUMBER.EDIT.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'PHONE_NUMBER.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}
