import { FormBase } from 'core/components';

export default class PhoneNumberEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
                'number',
                'description'
            ],

            labels: {
                'number': 'Number',
                'description': 'Description'
            },

            placeholders: {
                'number': 'Enter Number',
                'description': 'Enter number description'
            },

            rules: {
                'number': 'required|string',
                'description': 'string'
            }
        };
    }
};