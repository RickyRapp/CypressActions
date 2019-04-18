import { Form } from 'mobx-react-form';
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from 'validatorjs';
import { dvrExtend } from 'core/models';

class FormBase extends Form {
  constructor(hooks) {

    super(
      {},
      {
        plugins: {
          dvr: dvr({
            package: validatorjs,
            extend: dvrExtend
          }),
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
