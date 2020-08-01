import { FormBase } from 'core/components';

export default class DonorEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'blankBookletMaxAmount',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.BLANK_BOOKLET_MAX_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.BLANK_BOOKLET_MAX_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.LOW_BALANCE_REMAINDER_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.LOW_BALANCE_REMAINDER_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'lineOfCredit',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.LINE_OF_CREDIT_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.LINE_OF_CREDIT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'certificateDeductionPercentage',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.CERTIFICATE_DEDUCTION_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.CERTIFICATE_DEDUCTION_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'certificateFeePercentage',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.CERTIFICATE_FEE_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.CERTIFICATE_FEE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'contributionMinimumAdditionalAmount',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.CONTRIBUTION_MINIMUM_ADDITIONAL_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.CONTRIBUTION_MINIMUM_ADDITIONAL_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'contributionMinimumInitialAmount',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.CONTRIBUTION_MINIMUM_INITIAL_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.CONTRIBUTION_MINIMUM_INITIAL_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'extraBookletPercentage',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.EXTRA_BOOKLET_PERCENTAGE_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.EXTRA_BOOKLET_PERCENTAGE_PLACEHOLDER',
                    rules: 'numeric|min:0|max:10',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'grantFeePercentage',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.GRANT_FEE_LABEL_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.GRANT_FEE_LABEL_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'grantMinimumAmount',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.GRANT_MINIMUM_AMOUNT_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.GRANT_MINIMUM_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'isInitialContributionDone',
                    label: 'DONOR.ACCOUNT_SETTINGS_FIELDS.INITIAL_CONTRIBUTION_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTINGS_FIELDS.INITIAL_CONTRIBUTION_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}
