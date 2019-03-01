import { FormBase } from 'core/components';

export default class DonorAccountAddressEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
                'primary',
                'emailAddress',
                'emailAddress.email',
                'emailAddress.description'
            ],

            labels: {
                'primary': 'Primary',
                'emailAddress': 'Email Address',
                'emailAddress.email': 'Email',
                'emailAddress.description': 'Description'
            },

            placeholders: {
                'primary': 'Select Primary Address',
                'emailAddress.email': 'Enter Email',
                'emailAddress.description': 'Enter description'
            },

            rules: {
                'primary': 'boolean',
                'emailAddress.email': 'required|email',
                'emailAddress.description': 'string'
            }
        };
    }
};