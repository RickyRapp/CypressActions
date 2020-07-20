import { FormBase } from 'core/components';

export default class FundTransferCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'senderDonorId',
                    label: 'FUND_TRANSFER.CREATE.FIELDS.SENDER_DONOR_LABEL',
                    placeholder: 'FUND_TRANSFER.CREATE.FIELDS.SENDER_DONOR_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'recipientDonorId',
                    label: 'FUND_TRANSFER.CREATE.FIELDS.RECIPIENT_DONOR_LABEL',
                    placeholder: 'FUND_TRANSFER.CREATE.FIELDS.RECIPIENT_DONOR_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: 'FUND_TRANSFER.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'FUND_TRANSFER.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'description',
                    label: 'FUND_TRANSFER.CREATE.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'FUND_TRANSFER.CREATE.FIELDS.DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}