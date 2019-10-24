import { FormBase } from 'core/components';
import moment from 'moment';

export default class FundTransferCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'senderDonorAccountId',
                    label: 'FUND_TRANSFER.CREATE.FIELDS.SENDER_DONOR_ACCOUNT_LABEL',
                    placeholder: 'FUND_TRANSFER.CREATE.FIELDS.SENDER_DONOR_ACCOUNT_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'recipientDonorAccountId',
                    label: 'FUND_TRANSFER.CREATE.FIELDS.RECIPIENT_DONOR_ACCOUNT_LABEL',
                    placeholder: 'FUND_TRANSFER.CREATE.FIELDS.RECIPIENT_DONOR_ACCOUNT_PLACEHOLDER',
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