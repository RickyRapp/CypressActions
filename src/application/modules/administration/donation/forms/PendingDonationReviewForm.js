import { FormBase } from 'core/components';
import moment from 'moment';
export default class PendingDonationReviewForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'paymentTypeId',
                    label: 'DONATION.REVIEW.FIELDS.PAYMENT_TYPE_LABEL',
                    placeholder: 'DONATION.REVIEW.FIELDS.PAYMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'paymentNumber',
                    label: 'DONATION.REVIEW.FIELDS.PAYMENT_NUMBER_LABEL',
                    placeholder: 'DONATION.REVIEW.FIELDS.PAYMENT_NUMBER_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'paymentDate',
                    label: 'Payment Date',
                    placeholder: 'Payment Date',
                    type: 'date',
                    rules: `required|min_date:${moment().format('YYYY-MM-DD')}`,
					value: moment().format('YYYY-MM-DD'),
					options: {
						validateOnChange: false,
					},
                },
                {
                    name: 'selectedItems',
                    label: 'Selected Items'
                },
                {
                    name: 'accountTransferNumber',
                    label: 'CA Number'
                }
            ]
        };
    }
}