import { FormBase } from 'core/components';

export default class RegisterForm extends FormBase {
  constructor(hooks) {
    super(hooks);
  }

  setup() {
    return {
      fields: [
        {
          name: 'username',
          label: 'Username',
          placeholder: 'Enter username',
          rules: 'required|string|between:5,25'
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
          type: 'password',
          placeholder: 'Enter Password',
          rules: [
            'required',
            'string',
            'min:8',
            'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'
          ]
        },
        {
          name: 'confirmPassword',
          label: 'Confirm password',
          placeholder: 'Confirm password',
          rules: 'required|string|same:password',
          type: 'password'
        },
        {
          name: 'botProtection',
          label: 'Bot Protection',
          rules: 'required|string'
        }
      ]
    };
  }
}
