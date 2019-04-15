import { FormBase } from 'core/components';

export default class DonorAccountSettingAdministrationEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'initialContribution',
                    label: 'Initial Contribution',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'contributionMinimumInitial',
                    label: 'Set minimum initial contribution',
                    placeholder: 'Enter minimum for initial contribution',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'contributionMinimumAdditional',
                    label: 'Set minimum for additional contribution',
                    placeholder: 'Enter minimum for additional contribution',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'grantMinimumAmount',
                    label: 'Set minimum for grants',
                    placeholder: 'Enter minimum for grants',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'grantFee',
                    label: 'Set minimum for grant fee',
                    placeholder: 'Enter minimum for grant fee',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'certificateDeduction',
                    label: 'Set minimum for certificate deduction',
                    placeholder: 'Enter minimum for certificate deduction',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'certificateFee',
                    label: 'Set minimum for certificate fee',
                    placeholder: 'Enter minimum for certificate fee',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'extraBookletPercentage',
                    label: 'Set minimum for extra booklet percentage',
                    placeholder: 'Enter minimum for extra booklet percentage',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'lineOfCredit',
                    label: 'Set line of credit',
                    placeholder: 'Enter line of credit',
                    rules: 'required|numeric|min:0'
                }
            ]
        };
    }
};

