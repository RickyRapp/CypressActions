import { FormBase } from 'core/components';

export default class BankAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
                'name',
                'accountNumber',
                'routingNumber',
                'description'
            ],

            labels: {
                'name': 'Name',
                'accountNumber': 'Account Number',
                'routingNumber': 'Routing Number',
                'description': 'Description'
            },

            placeholders: {
                'name': 'Enter Name',
                'accountNumber': 'Enter Account Number',
                'routingNumber': 'Enter Routing Number',
                'description': 'Enter Description'
            },

            rules: {
                'name': 'required|string',
                'accountNumber': 'required|string',
                'routingNumber': 'required|string',
                'description': 'string'
            }
        };
    }
};