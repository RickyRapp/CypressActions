import { FormBase } from 'core/components';

export default class DonorAccountAddressEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
                'addressLine1',
                'addressLine2',
                'city',
                'state',
                'zipCode',
                'description'
            ],

            labels: {
                'addressLine1': 'Address Line 1',
                'addressLine2': 'Address Line 2',
                'city': 'City',
                'state': 'State',
                'zipCode': 'Zip Code',
                'description': 'Description'
            },

            placeholders: {
                'addressLine1': 'Enter Address Line 1',
                'addressLine2': 'Enter Address Line 2',
                'city': 'Enter City',
                'state': 'Enter State',
                'zipCode': 'Enter Zip Code',
                'description': 'Enter address description'
            },

            rules: {
                'id': 'required|string',
                'addressLine1': 'required|string',
                'addressLine2': 'string',
                'city': 'required|string',
                'state': 'required|string',
                'zipCode': 'required|string',
                'description': 'string'
            }
        };
    }
};