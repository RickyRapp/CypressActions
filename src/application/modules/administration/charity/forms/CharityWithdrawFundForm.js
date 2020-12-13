import { FormBase } from 'core/components';

export default class CharityWithdrawFundForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'amount',
                    label: 'CHARITY.WITHDRAW_FUND.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY.WITHDRAW_FUND.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'paymentTypeId',
                    label: 'CHARITY.WITHDRAW_FUND.FIELDS.PAYMENT_TYPE_LABEL',
                    placeholder: 'CHARITY.WITHDRAW_FUND.FIELDS.PAYMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'paymentNumber',
                    label: 'CHARITY.WITHDRAW_FUND.FIELDS.PAYMENT_NUMBER_LABEL',
                    placeholder: 'CHARITY.WITHDRAW_FUND.FIELDS.PAYMENT_NUMBER_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}