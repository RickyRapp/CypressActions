import { FormBase } from 'core/components';

export default class PhoneNumberCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'number',
                    label: 'PHONENUMBER.NUMBER',
                    rules: 'required|string',
                },
                {
                    name: 'description',
                    label: 'PHONENUMBER.DESCRIPTION',
                    rules: 'string',
                },
            ]
        }
    };
}