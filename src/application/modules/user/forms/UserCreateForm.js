import { FormBase } from 'core/components';
import {userProfileFormProperties } from 'application/user/forms';

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
                    rules: 'required|string|min:5|max:20'
                },
                {
                    name: 'userEmail',
                    label: 'USER.CREATE.EMAIL_LABEL',
                    placeholder: 'USER.CREATE.EMAIL_PLACEHOLDER',
                    rules: 'required|email|string'
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
                    name: 'confirmUserEmail',
                    label: 'USER.CREATE.CONFIRM_EMAIL_LABEL',
                    placeholder: 'USER.CREATE.CONFIRM_EMAIL_PLACEHOLDER',
                    rules: 'required|email|same:userEmail'
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
                ...userProfileFormProperties.fields,

            ],
            // initials: {
            //     ...userProfileFormProperties.initials
            // }
        };
    }
}
