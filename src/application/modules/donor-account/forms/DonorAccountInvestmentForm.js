import { FormBase } from 'core/components';

export default class DonorAccountInvestmentForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'donorAccountInvestmentId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: 'DONOR_ACCOUNT_INVESTMENT.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'DONOR_ACCOUNT_INVESTMENT.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                }
            ]
        };
    }
}