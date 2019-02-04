import { FormBase } from 'core/components';

export default class UserPasswordChangeForm extends FormBase {
  constructor(hooks) {
    super(hooks);
  }

  setup() {
    return {
      fields: [
        {
          name: 'newPassword',
          label: 'New password',
          placeholder: 'Enter a new password',
          rules: [
            'required',
            'string',
            'min:8',
            'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'
          ],
          type: 'password'
        },
        {
          name: 'confirmPassword',
          label: 'Confirm password',
          placeholder: 'Confirm password',
          rules: 'required|string|same:newPassword',
          type: 'password'
        }
      ]
    };
  }
}
