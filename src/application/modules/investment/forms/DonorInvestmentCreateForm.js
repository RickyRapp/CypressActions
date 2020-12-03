import { FormBase } from 'core/components';
import moment from 'moment';

export default class DonorInvestmentCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'investmentPoolId',
                    label: 'DONOR_INVESTMENT.CREATE.FIELDS.INVESTMENT_POOL_LABEL',
                    placeholder: 'DONOR_INVESTMENT.CREATE.FIELDS.INVESTMENT_POOL_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}