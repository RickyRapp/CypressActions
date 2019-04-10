import { FormBase } from 'core/components';

export default class FundTransferCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'senderDonorAccountId',
                'recipientDonorAccountId',
                'description',
                'paymentTransaction',
                'amount',
            ],

            labels: {
                'senderDonorAccountId': 'Sender Donor',
                'recipientDonorAccountId': 'recipient Donor',
                'description': 'Description',
                'amount': 'Amount',
            },

            placeholders: {
                'senderDonorAccountId': 'Select Sender Donor',
                'recipientDonorAccountId': 'Select Recipient Donor',
                'description': 'Enter Description',
                'amount': 'Enter Amount',
            },

            rules: {
                'senderDonorAccountId': 'required|string',
                'recipientDonorAccountId': 'required|string',
                'description': 'string',
                'amount': 'required|numeric|min:0',
            }
        };
    }
};