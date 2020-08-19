import { FormBase } from 'core/components';

export default class InvestmentPoolEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'aggressiveGrowthChange',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p4',
                        step: 0.001
                    }
                },
                {
                    name: 'aggressiveGrowthPoolValue',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2',
                        step: 1
                    }
                },
                {
                    name: 'balancedChange',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p4',
                        step: 0.001
                    }
                },
                {
                    name: 'balancedPoolValue',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2',
                        step: 1
                    }
                },
                {
                    name: 'conservativeIncomeChange',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p4',
                        step: 0.001
                    }
                },
                {
                    name: 'conservativeIncomePoolValue',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2',
                        step: 1
                    }
                },
                {
                    name: 'growthChange',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p4',
                        step: 0.001
                    }
                },
                {
                    name: 'growthPoolValue',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2',
                        step: 1
                    }
                },
                {
                    name: 'incomeChange',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p4',
                        step: 0.001
                    }
                },
                {
                    name: 'incomePoolValue',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2',
                        step: 1
                    }
                },
                {
                    name: 'moderateGrowthChange',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p4',
                        step: 0.001
                    }
                },
                {
                    name: 'moderateGrowthPoolValue',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2',
                        step: 1
                    }
                },
                {
                    name: 'moderateIncomeChange',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.CHANGE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'p4',
                        step: 0.001
                    }
                },
                {
                    name: 'moderateIncomePoolValue',
                    label: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_LABEL',
                    placeholder: 'INVESTMENT_POOL.EDIT.FIELDS.POOL_VALUE_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2',
                        step: 1
                    }
                }
            ],
        };
    }
}