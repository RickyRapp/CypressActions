import { FormBase } from 'core/components';

export default class ContributionAchCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
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