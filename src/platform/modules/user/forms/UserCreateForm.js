import { FormBase } from 'core/components';

export default class UserCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'userName',
                    label: 'User name',
                    placeholder: 'Enter user name',
                    rules: 'required|string|between:3,50'
                },
                {
                    name: 'email',
                    label: 'Email',
                    placeholder: 'Enter email',
                    rules: 'required|email|string'
                },
                {
                    name: 'password',
                    label: 'Password',
                    placeholder: 'Password',
                    rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                    type: 'password'
                },
                {
                    name: 'confirmPassword',
                    label: 'Confirm password',
                    placeholder: 'Confirm password',
                    rules: 'required|string|same:password',
                    type: 'password'
                },
                {
                    name: 'roles',
                    label: 'User roles',
                    placeholder: 'Select user roles',
                    rules: 'required'
                }
            ],
        };
    }
}