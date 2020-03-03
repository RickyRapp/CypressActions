import { FormBase } from 'core/components';

export default class CharityGrantRequestCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'phoneNumber',
                    label: 'GRANT_REQUEST.CREATE.FIELDS.NUMBER_LABEL',
                    rules: 'required|string',
                    extra: {
                        format: '(###) ###-####'
                    },
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
        }
    }
}
