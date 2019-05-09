import { FormBase } from 'core/components';

export default class EmailAddressCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'email',
                    label: 'EMAILADDRESS.EMAIL',
                    rules: 'required|email',
                },
                {
                    name: 'description',
                    label: 'EMAILADDRESS.DESCRIPTION',
                    rules: 'string',
                },
            ]
        }
    };
}