import { FormBase } from 'core/components';
import { userProfileFormProperties } from 'application/administration/user/forms';

export default class UserCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'userName',
                    label: 'USER.CREATE.USERNAME_LABEL',
                    placeholder: 'USER.CREATE.USERNAME_PLACEHOLDER',
                    rules: 'required|string|min:5|max:50'
                },
                {
                    name: 'userEmail',
                    label: 'USER.CREATE.EMAIL_LABEL',
                    placeholder: 'USER.CREATE.EMAIL_PLACEHOLDER',
                    rules: 'required|email|string'
                },
                {
                    name: 'confirmUserEmail',
                    label: 'USER.CREATE.CONFIRM_EMAIL_LABEL',
                    placeholder: 'USER.CREATE.CONFIRM_EMAIL_PLACEHOLDER',
                    rules: 'required|email|same:userEmail'
                },
                {
                    name: 'firstName',
                    label: 'USER.CREATE.FIRST_NAME_LABEL',
                    rules: 'required|string|min:1|max:40'
                },
                {
                    name: 'lastName',
                    label: 'USER.CREATE.LAST_NAME_LABEL',
                    rules: 'required|string|min:1|max:40'
                },
                {
                    name: 'password',
                    label: 'USER.CREATE.PASSWORD_LABEL',
                    placeholder: 'USER.CREATE.PASSWORD_PLACEHOLDER',
                    rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                    type: 'password'
                },
                {
                    name: 'confirmPassword',
                    label: 'USER.CREATE.CONFIRM_PASSWORD_LABEL',
                    placeholder: 'USER.CREATE.CONFIRM_PASSWORD_PLACEHOLDER',
                    rules: 'required|string|same:password',
                    type: 'password'
                },
                {
                    name: 'roles',
                    label: 'USER.CREATE.ROLES_LABEL',
                    placeholder: 'USER.CREATE.ROLES_PLACEHOLDER',
                    rules: 'required|array_required'
                },
                {
                    name: 'fundName',
                    label: 'USER.CREATE.FUND_NAME_LABEL',
                    rules: 'string|min:1|max:40'
                },
                {
                    name: 'addressLine1',
                    label: 'USER.CREATE.ADDRESS_LINE_1_LABEL',
                    rules: 'string|min:1|max:40'
                },
                {
                    name: 'addressLine2',
                    label: 'USER.CREATE.ADDRESS_LINE_2_LABEL',
                    rules: 'string|min:1|max:40'
                },
                {
                    name: 'city',
                    label: 'USER.CREATE.CITY_LABEL',
                    rules: 'string|min:1|max:40'
                },
                {
                    name: 'state',
                    label: 'USER.CREATE.STATE_LABEL',
                    rules: 'string|min:1|max:40'
                },
                {
                    name: 'zip',
                    label: 'USER.CREATE.ZIP',
                    rules: 'string|min:1|max:40'
                },
                {
                    name: 'phoneNumber',
                    label: 'USER.CREATE.PHONE_NUMBER_LABEL',
                    rules: 'string',
                    extra: {
                        format: '(###) ###-####'
                    }
                },
                {
                    name: 'securityPin',
                    label: 'USER.CREATE.PIN',
                    rules: 'string|digits:4',
                    extra: {
                        format: '####'
                    },
                },
                {
                    name: 'confirmSecurityPin',
                    label: 'USER.CREATE.CONFIRM_PIN',
                    rules: 'string|digits:4|same:securityPin',
                    extra: {
                        format: '####'
                    },
                },
                {
                    name: 'isPrivateClientSuite',
                    label: 'USER.CREATE.IS_PRIVATE_CLIENT_SUITE',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isThisABussinessAccount',
                    label: 'USER.CREATE.IS_THIS_A_BUSSINESS_ACCOUNT',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                ...userProfileFormProperties.fields,

            ],
        };
    }
}
