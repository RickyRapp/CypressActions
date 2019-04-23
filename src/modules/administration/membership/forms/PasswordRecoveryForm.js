import { FormBase } from 'core/components';

export default class PasswordRecoveryForm extends FormBase {
  constructor(hooks) {
    super(hooks);
  }

  setup() {
    return {
      fields: [
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Enter your e-mail or username',
          rules: 'required|email'
        }
      ]
    };
  }
}
