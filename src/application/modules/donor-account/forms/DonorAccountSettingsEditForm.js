import { FormBase } from 'core/components';

export const donorAccountSettingsFormProperties = {
    fields: [
        {
            name: 'lineOfCredit',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.LINE_OF_CREDIT_LABEL',
            rules: 'required|numeric|min:0',
            extra: {
                type: 'c2'
            }
        },
        {
            name: 'certificateDeduction',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.CERTIFICATE_DEDUCTION_LABEL',
            rules: 'required|numeric|min:0|max:100',
            extra: {
                type: 'c2'
            }
        },
        {
            name: 'certificateFee',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.CERTIFICATE_FEE_LABEL',
            rules: 'required|numeric|min:0|max:100',
            extra: {
                type: 'c2'
            }
        },
        {
            name: 'contributionMinimumAdditional',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.CONTRIBUTION_MINIMUM_ADDITIONAL_LABEL',
            rules: 'required|numeric|min:0',
            extra: {
                type: 'c2'
            }
        },
        {
            name: 'contributionMinimumInitial',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.CONTRIBUTION_MINIMUM_INITIAL_LABEL',
            rules: 'required|numeric|min:0',
            extra: {
                type: 'c2'
            }
        },
        {
            name: 'extraBookletPercentage',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.EXTRA_BOOKLET_PERCENTAGE_LABEL',
            rules: 'numeric|min:0|max:1000',
            extra: {
                type: 'c2'
            }
        },
        {
            name: 'grantFee',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.GRANT_FEE_LABEL_LABEL',
            rules: 'required|numeric|min:0|max:100',
            extra: {
                type: 'c2'
            }
        },
        {
            name: 'grantMinimumAmount',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.GRANT_MINIMUM_AMOUNT_LABEL',
            rules: 'required|numeric|min:0',
            extra: {
                type: 'c2'
            }
        },
        {
            name: 'initialContribution',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.INITIAL_CONTRIBUTION_LABEL',
            rules: 'required|boolean',
            type: 'checkbox'
        },
        {
            name: 'securityPin',
            label: 'DONOR_ACCOUNT.ACCOUNT_SETTINGS_FIELDS.SECURITY_PIN_LABEL',
            rules: 'required|string|digits:4'
        }
    ]
};

export default class DonorAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return donorAccountSettingsFormProperties;
    }
}
