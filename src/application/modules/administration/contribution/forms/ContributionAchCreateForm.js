import { FormBase } from 'core/components';

export default class ContributionAchCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'paymentNumber',
                    label: 'CONTRIBUTION.LIST.COLUMNS.ENTER_BATCH_NUMBER',
                    placeholder: 'CONTRIBUTION.LIST.COLUMNS.BATCH_NUMBER',
                    rules: 'required|string'
                }
            ]
        };
    }
}