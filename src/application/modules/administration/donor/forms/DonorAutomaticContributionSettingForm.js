import { FormBase } from 'core/components';

export default class DonorAutomaticContributionSettingForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'amount',
                    label: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.AMOUNT_LABEL',
                    placeholder: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:250',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'donorBankAccountId',
                    label: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.BANK_ACCOUNT_LABEL',
                    placeholder: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.BANK_ACCOUNT_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'lowBalanceAmount',
                    label: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.LOW_BALANCE_AMOUNT_LABEL',
                    placeholder: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.LOW_BALANCE_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:250',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'isEnabled',
                    label: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.IS_ENABLED_LABEL',
                    placeholder: 'DONOR.AUTOMATIC_CONTRIBUTION_SETTING.EDIT.FIELDS.IS_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}