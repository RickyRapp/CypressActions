import { FormBase } from 'core/components';

export default class CharityPaymentOptionsForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'keepFundsUntilManuallyDistributed',
                    label: 'CHARITY.PAYMENT_OPTIONS.FIELDS.KEEP_UNTIL_MANUALLY_LABEL',
                    placeholder: 'CHARITY.PAYMENT_OPTIONS.FIELDS.KEEP_UNTIL_MANUALLY',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'keepFundsUntilAccumulatedAmount',
                    label: 'CHARITY.PAYMENT_OPTIONS.FIELDS.DISTRIBUTE_WHEN_ACCUMULATED_LABEL',
                    placeholder: 'CHARITY.PAYMENT_OPTIONS.FIELDS.DISTRIBUTE_WHEN_ACCUMULATED',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'AccumulatedAmount',
                    label: 'CHARITY.PAYMENT_OPTIONS.FIELDS.ACCUMULATED_AMOUNT',
                    placeholder: 'CHARITY.PAYMENT_OPTIONS.FIELDS.ACCUMULATED_AMOUNT_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                }
            ]
        };
    }
}