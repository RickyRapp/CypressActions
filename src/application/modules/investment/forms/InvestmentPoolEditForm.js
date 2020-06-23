import { FormBase } from 'core/components';

export default class InvestmentPoolEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'aggressiveGrowthName',
                    rules: 'string'
                },
                {
                    name: 'aggressiveGrowthChange',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p6',
                        step: 0.001
                    }
                },
                {
                    name: 'balancedName',
                    rules: 'string'
                },
                {
                    name: 'balancedChange',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p6',
                        step: 0.001
                    }
                },
                {
                    name: 'conservativeIncomeName',
                    rules: 'string'
                },
                {
                    name: 'conservativeIncomeChange',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p6',
                        step: 0.001
                    }
                },
                {
                    name: 'growthName',
                    rules: 'string'
                },
                {
                    name: 'growthChange',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p6',
                        step: 0.001
                    }
                },
                {
                    name: 'incomeName',
                    rules: 'string'
                },
                {
                    name: 'incomeChange',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p6',
                        step: 0.001
                    }
                },
                {
                    name: 'moderateGrowthName',
                    rules: 'string'
                },
                {
                    name: 'moderateGrowthChange',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p6',
                        step: 0.001
                    }
                },
                {
                    name: 'moderateIncomeName',
                    rules: 'string'
                },
                {
                    name: 'moderateIncomeChange',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p6',
                        step: 0.001
                    }
                }
            ],
        };
    }
}