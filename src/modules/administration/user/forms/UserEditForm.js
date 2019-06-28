import { FormBase } from 'core/components';

export default class UserEditForm extends FormBase {
  constructor(hooks) {
    super(hooks);
  }

  setup() {
    return {
      fields: [
        {
          name: 'displayName',
          label: 'Display name',
          placeholder: 'Enter display name',
          rules: 'required'
        },
        {
          name: 'userName',
          label: 'User name',
          placeholder: 'Enter user name',
          rules: 'required'
        },
        {
          name: 'email',
          label: 'Email',
          placeholder: 'Enter email',
          rules: 'required|email|string'
        },
        {
          name: 'roles',
          label: 'User roles',
          placeholder: 'Select user roles',
          rules: 'required'
        }
      ]
    };
  }
}
