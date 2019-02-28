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
                'address',
                'address.id',
                'address.addressLine1',
                'address.addressLine2',
                'address.city',
                'address.state',
                'address.zipCode',
                'address.description'
            ],

            labels: {
                'primary': 'Primary',
                'address': 'Address',
                'address.addressLine1': 'Address Line 1',
                'address.addressLine2': 'Address Line 2',
                'address.city': 'City',
                'address.state': 'State',
                'address.zipCode': 'Zip Code',
                'address.description': 'Description'
            },

            placeholders: {
                'primary': 'Select Primary Address',
                'address.addressLine1': 'Enter Address Line 1',
                'address.addressLine2': 'Enter Address Line 2',
                'address.city': 'Enter City',
                'address.state': 'Enter State',
                'address.zipCode': 'Enter Zip Code',
                'address.description': 'Enter address description'
            },

            rules: {
                'primary': 'boolean',
                'address.addressLine1': 'required|string',
                'address.addressLine2': 'string',
                'address.city': 'required|string',
                'address.state': 'required|string',
                'address.zipCode': 'required|string',
                'address.description': 'string'
            }
        };
    }
};