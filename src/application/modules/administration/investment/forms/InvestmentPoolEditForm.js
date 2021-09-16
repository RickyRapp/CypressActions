import { FormBase } from 'core/components';

export default class InvestmentPoolEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'investmentPoolHistory',
                'investmentPoolHistory[].percentageChange',
                'investmentPoolHistory[].totalPoolValue',
                'investmentPoolHistory[].investmentPoolId'

            ],
            labels: {
                'investmentPoolHistory': '',
                'investmentPoolHistory[].percentageChange': 'INVESTMENT_POOL.EDIT.FIELDS.PERCENTAGE_CHANGE_LABEL',
                'investmentPoolHistory[].totalPoolValue': 'INVESTMENT_POOL.EDIT.FIELDS.DOLLAR_CHANGE_LABEL'
            },
            rules: {
                'investmentPoolHistory[].percentageChange': 'required|numeric',
                'investmentPoolHistory[].totalPoolValue': 'required|numeric|min:0',
                'investmentPoolHistory[].investmentPoolId': 'required|string'
            },
            extra: {
                'investmentPoolHistory[].percentageChange':
                {
                    type: 'p2',
                    step: 0.0001
                },
                'investmentPoolHistory[].totalPoolValue':
                {
                    type: 'c2',
                    step: 1
                }
            }
        };
    }
}