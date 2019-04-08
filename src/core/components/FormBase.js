import { Form } from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { dvrExtend } from 'core/models';

class FormBase extends Form {
  constructor(hooks) {

    super(
      {},
      {
        plugins: {
          dvr: {
            package: validatorjs,
            extend: dvrExtend,
          },
        },
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
