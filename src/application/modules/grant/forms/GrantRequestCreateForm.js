import { FormBase } from 'core/components';
import moment from 'moment';

export default class GrantRequestCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'phoneNumber',
                    label: 'GRANT_REQUEST.CREATE.FIELDS.PHONE_NUMBER_LABEL',
                    rules: 'required|string|phoneNumberExist',
                    options: {
                        validateOnChange: false
                    },
                    extra: {
                        format: '(###) ###-####'
                    }
                },
                {
                    name: 'amount',
                    label: 'GRANT_REQUEST.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'GRANT_REQUEST.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                }
            ]
        };
    }
}