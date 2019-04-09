import { FormBase } from 'core/components';

export default class FundTransferCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'senderDonorAccountId',
                'recepientDonorAccountId',
                'description',
                'paymentTransaction',
                'amount',
            ],

            labels: {
                'senderDonorAccountId': 'Sender Donor',
                'recepientDonorAccountId': 'Recepient Donor',
                'description': 'Description',
                'amount': 'Amount',
            },

            placeholders: {
                'senderDonorAccountId': 'Select Sender Donor',
                'recepientDonorAccountId': 'Select Recepient Donor',
                'description': 'Enter Description',
                'amount': 'Enter Amount',
            },

            rules: {
                'senderDonorAccountId': 'required|string',
                'recepientDonorAccountId': 'required|string',
                'description': 'string',
                'amount': 'required|numeric|min:0',
            }
        };
    }
};