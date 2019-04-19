import { FormBase } from 'core/components';

export default class DonorAccountSettingAdministrationEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }
    setup() {
        return {
            fields: [
                'securityPin',
                'deliveryMethodTypeId',
                'initialContribution',
                'contributionMinimumInitial',
                'contributionMinimumAdditional',
                'grantMinimumAmount',
                'grantFee',
                'certificateDeduction',
                'certificateFee',
                'extraBookletPercentage',
                'lineOfCredit',
                'blankBookletMax',
                'notificationLimitRemainderAmount',
            ],

            labels: {
                'securityPin': 'Security Pin',
                'deliveryMethodTypeId': 'Delivery Method Type',
                'initialContribution': 'Initial Contribution',
                'contributionMinimumInitial': 'Minimum Initial Contribution',
                'contributionMinimumAdditional': 'Minimum Additional Contribution',
                'grantMinimumAmount': 'Minimum Grant',
                'grantFee': 'Grant Fee',
                'certificateDeduction': 'Certificate Deduction',
                'certificateFee': 'Certificate Fee',
                'extraBookletPercentage': 'Extra Booklet Percentage',
                'lineOfCredit': 'Line Of Credit',
                'blankBookletMax': 'Blank Booklet Max Amount',
                'notificationLimitRemainderAmount': 'Low Balance Amount',
            },

            placeholders: {
                'deliveryMethodTypeId': 'Choose Delivery Method Type',
                'securityPin': 'Enter Security Pin',
                'initialContribution': 'Initial Contribution',
                'contributionMinimumInitial': 'Enter Minimum Initial Contribution',
                'contributionMinimumAdditional': 'Enter Minimum Additional Contribution',
                'grantMinimumAmount': 'Enter Minimum Grant',
                'grantFee': 'Enter Grant Fee',
                'certificateDeduction': 'Enter Certificate Deduction',
                'certificateFee': 'Enter Certificate Fee',
                'extraBookletPercentage': 'Enter Extra Booklet Percentage',
                'lineOfCredit': 'Enter Line Of Credit',
                'blankBookletMax': 'Enter Blank Booklet Max Amount',
                'notificationLimitRemainderAmount': 'Enter Low Balance Amount'
            },

            rules: {
                'deliveryMethodTypeId': 'required|string',
                'securityPin': 'required|string|size:4',
                'initialContribution': 'required|boolean',
                'contributionMinimumInitial': 'required|numeric|min:0',
                'contributionMinimumAdditional': 'required|numeric|min:0',
                'grantMinimumAmount': 'required|numeric|min:0',
                'grantFee': 'required|numeric|min:0',
                'certificateDeduction': 'required|numeric|min:0',
                'certificateFee': 'required|numeric|min:0',
                'extraBookletPercentage': 'numeric|min:0',
                'lineOfCredit': 'required|numeric|min:0',
                'blankBookletMax': 'numeric|min:0',
                'notificationLimitRemainderAmount': 'numeric'
            },

            types: {
                'initialContribution': 'checkbox'
            },

            options: {
                'securityPin': {
                    validateOnChange: true
                }
            }
        };
    }
};