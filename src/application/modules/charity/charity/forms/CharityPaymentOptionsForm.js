import { FormBase } from 'core/components';

export default class CharityPaymentOptionsForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'keepFundsUntilManuallyDistributed',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'keepFundsUntilAccumulatedAmount',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'AccumulatedAmount',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_PLACEHOLDER',
                    rules: 'numeric|min:0'
                }
            ]
        };
    }
}