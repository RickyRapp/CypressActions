import { FormBase } from 'core/components';

export default class DonorAccountPhoneNumberCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'number',
                'description'
            ],

            labels: {
                'number': 'Number',
                'description': 'Description'
            },

            placeholders: {
                'number': 'Enter Number',
                'description': 'Enter Description'
            },

            rules: {
                'number': 'required|string',
                'description': 'string'
            }
        };
    }
};