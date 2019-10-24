import { FormBase } from 'core/components';

export default class DonationReviewForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
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
                    name: 'address',
                    fields: [
                        {
                            name: 'addressLine1',
                            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_FIELD',
                            rules: 'string'
                        },
                        {
                            name: 'addressLine2',
                            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_FIELD',
                            rules: 'string'
                        },
                        {
                            name: 'city',
                            label: 'ADDRESS.EDIT.FIELDS.CITY_FIELD',
                            rules: 'string'
                        },
                        {
                            name: 'state',
                            label: 'ADDRESS.EDIT.FIELDS.STATE_FIELD',
                            rules: 'string'
                        },
                        {
                            name: 'zipCode',
                            label: 'ADDRESS.EDIT.FIELDS.ZIPCODE_FIELD',
                            rules: 'string'
                        },
                    ]
                }
            ]
        };
    }
}