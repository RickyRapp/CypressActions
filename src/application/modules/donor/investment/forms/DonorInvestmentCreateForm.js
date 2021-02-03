import { FormBase } from 'core/components';

export default class DonorInvestmentCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'amount',
                'pools',
                'pools[].id',
                'pools[].isChecked',
                'items[].percentage'
            ],
            labels: {
                'amount': 'DONOR_INVESTMENT.CREATE.FIELDS.AMOUNT_LABEL',
                'pools': 'DONOR_INVESTMENT.CREATE.FIELDS.POOLS_LABEL',
                'pools[].isChecked': 'DONOR_INVESTMENT.CREATE.FIELDS.IS_CHECKED_LABEL',
                'pools[].percentage': 'DONOR_INVESTMENT.CREATE.FIELDS.PERCENTAGE_LABEL',
            },
            rules: {
                'amount': 'required|numeric',
                'pools[].id': 'required|string',
                'pools[].isChecked': 'boolean',
                'pools[].percentage': 'numeric|min:0|max:100',
            },
            options: {
                'pools[].isChecked': 'checkbox'
            },
            extra: {
                'amount':
                {
                    type: 'c2'
                },
                'pools[].percentage':
                {
                    type: 'p0',
                    step: 1
                }
            }
        }
    }
}