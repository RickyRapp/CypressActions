import { Form } from 'mobx-react-form';
import validatorjs from 'validatorjs';

class FormBase extends Form {
  constructor(hooks) {
    super(
      {},
      {
        plugins: { dvr: validatorjs },
        hooks,
        options: {
          validationDebounceWait: 50
        }
      }
    );
  }

  setFieldsDisabled(disabled) {
    this.each(field => field.set('disabled', disabled));
  }
}

export default FormBase;
