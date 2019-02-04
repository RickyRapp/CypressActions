import { FormBase } from 'core/components';

export default class RoleEditForm extends FormBase {
  constructor(hooks) {
    super(hooks);
  }

  setup() {
    return {
      fields: [
        {
          name: 'name',
          label: 'Role name',
          placeholder: 'Enter role name',
          rules: 'required|string'
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          placeholder: 'Role description',
          rules: 'string'
        }
      ]
    };
  }
}
