import { FormBase } from 'core/components';

export default class DonorAccountEmailAddressCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'email',
                'description'
            ],

            labels: {
                'email': 'Email',
                'description': 'Description'
            },

            placeholders: {
                'email': 'Enter Email',
                'description': 'Enter description'
            },

            rules: {
                'email': 'required|email',
                'description': 'string'
            }
        };
    }
};