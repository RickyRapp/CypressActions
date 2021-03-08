import { FormBase } from 'core/components';

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
                }
            ]
        };
    }
}