import { FormBase } from 'core/components';

export default class EmailAddressEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
                'email',
                'description'
            ],

            labels: {
                'email': 'Email',
                'description': 'Description'
            },

            placeholders: {
                'email': 'Enter Email',
                'description': 'Enter address description'
            },

            rules: {
                'email': 'required|email',
                'description': 'string'
            }
        };
    }
};