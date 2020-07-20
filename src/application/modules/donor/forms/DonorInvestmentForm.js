import { FormBase } from 'core/components';

export default class DonorInvestmentForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'donorInvestmentId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: 'DONOR_INVESTMENT.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'DONOR_INVESTMENT.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                }
            ]
        };
    }
}