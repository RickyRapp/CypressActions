import { FormBase } from 'core/components';

export default class LoginForm extends FormBase {
  constructor(hooks) {
    super(hooks);
  }

  setup() {
    return {
      fields: [
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Enter user name',
          rules: 'required|string|between:5,25'
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password',
          rules: 'required|string|between:5,25'
        }
      ]
    };
  }
}
