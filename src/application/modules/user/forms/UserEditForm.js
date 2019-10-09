import { FormBase } from 'core/components';
import {userProfileFormProperties} from 'application/user/forms';

export default class UserEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'email',
                    label: 'USER.EDIT.EMAIL_LABEL',
                    placeholder: 'USER.EDIT.EMAIL_PLACEHOLDER',
                    rules: 'required|email|string'
                },
                {
                    name: 'firstName',
                    label: 'USER.CREATE.FIRST_NAME_LABEL'
                },
                {
                    name: 'lastName',
                    label: 'USER.CREATE.LAST_NAME_LABEL'
                },
                {
                    name: 'roles',
                    label: 'USER.EDIT.ROLES_LABEL',
                    placeholder: 'USER.EDIT.ROLES_PLACEHOLDER',
                    rules: 'required'
                },
                ...userProfileFormProperties.fields,
            ]
        };
    }
}
