import { FormBase } from 'core/components';

export default class DonorGivingGoalsForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isYearly',
                    label: 'Yearly Income',
                    value: 'false',
                    rules: 'required|boolean',
                    type: 'radio'
                },
                {
                    name: 'amount',
                    label: 'Enter your income',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'percentage',
                    label: 'Enter the percentage of your income you want to donate',
                    rules: 'required|numeric|min:1|max:100'
                },
                {
                    name: 'note',
                    label: 'Leave a note regarding your amount',
                    rules: 'string'
                },
                {
                    name: 'autoMonthlyContribution',
                    label: 'Set up automatic monthly contribution?',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'autoDeduction',
                    label: 'Automatically deduct from my bank account?',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'donorBankAccountId',
                    label: 'Choose bank account',
                    rules: 'string',
                    value: null
                },
            ]
        }
    }
}
