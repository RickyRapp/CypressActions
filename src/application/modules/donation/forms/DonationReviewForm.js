import { FormBase } from 'core/components';

export default class DonationReviewForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'grantIds',
                    rules: 'string'
                },
                {
                    name: 'sessionIds',
                    rules: 'string'
                },
                {
                    name: 'charityId',
                    rules: 'required|string'
                },
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
                    name: 'bankAccountId',
                    rules: 'string'
                },
                {
                    name: 'attOf',
                    label: 'DONATION.REVIEW.FIELDS.ATT_OF_LABEL',
                    placeholder: 'DONATION.REVIEW.FIELDS.ATT_OF_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'addressLine1',
                    label: 'DONATION.REVIEW.FIELDS.ADDRESS_LINE_1_LABEL',
                    placeholder: 'DONATION.REVIEW.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'addressLine2',
                    label: 'DONATION.REVIEW.FIELDS.ADDRESS_LINE_2_LABEL',
                    placeholder: 'DONATION.REVIEW.FIELDS.ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'city',
                    label: 'DONATION.REVIEW.FIELDS.CITY_LABEL',
                    placeholder: 'DONATION.REVIEW.FIELDS.CITY_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'state',
                    label: 'DONATION.REVIEW.FIELDS.STATE_LABEL',
                    placeholder: 'DONATION.REVIEW.FIELDS.STATE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'zipCode',
                    label: 'DONATION.REVIEW.FIELDS.ZIPCODE_LABEL',
                    placeholder: 'DONATION.REVIEW.FIELDS.ZIPCODE_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}