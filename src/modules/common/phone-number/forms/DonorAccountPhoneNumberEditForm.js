import { FormBase } from 'core/components';

export default class DonorAccountPhoneNumberEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
                'primary',
                'phoneNumber',
                'phoneNumber.number',
                'phoneNumber.description'
            ],

            labels: {
                'primary': 'Primary',
                'phoneNumber': 'Phone Number',
                'phoneNumber.number': 'Number',
                'phoneNumber.description': 'Description'
            },

            placeholders: {
                'primary': 'Select Primary Phone Number',
                'phoneNumber.number': 'Enter Number',
                'phoneNumber.description': 'Enter Description'
            },

            rules: {
                'primary': 'boolean',
                'phoneNumber.number': 'required|email',
                'phoneNumber.description': 'string'
            }
        };
    }
};