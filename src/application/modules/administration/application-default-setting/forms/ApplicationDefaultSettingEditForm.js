import { FormBase } from 'core/components';

export default class ApplicationDefaultSettingEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    rules: 'required|string'
                },
                {
                    name: 'name',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.NAME_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'description',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
                    type: 'textarea',
                    rules: 'string'
                },
                {
                    name: 'regularCertificateDeductionPercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_CERTIFICATE_DEDUCTION_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_CERTIFICATE_DEDUCTION_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'regularCertificateFeePercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_CERTIFICATE_FEE_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_CERTIFICATE_FEE_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'privateCertificateDeductionPercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_CERTIFICATE_DEDUCTION_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_CERTIFICATE_DEDUCTION_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'privateCertificateFeePercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_CERTIFICATE_FEE_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_CERTIFICATE_FEE_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'regularGrantFeePercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_GRANT_FEE_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_GRANT_FEE_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'privateGrantFeePercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_GRANT_FEE_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_GRANT_FEE_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'regularLineOfCreditAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_LINE_OF_CREDIT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_LINE_OF_CREDIT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'privateLineOfCreditAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_LINE_OF_CREDIT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_LINE_OF_CREDIT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'regularMinimumAdditionalContributionAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_MINIMUM_ADDITIONAL_CONTRIBUTION_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_MINIMUM_ADDITIONAL_CONTRIBUTION_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'privateMinimumAdditionalContributionAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_MINIMUM_ADDITIONAL_CONTRIBUTION_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_MINIMUM_ADDITIONAL_CONTRIBUTION_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'regularMinimumInitialContributionAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_MINIMUM_INITIAL_CONTRIBUTION_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_MINIMUM_INITIAL_CONTRIBUTION_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'privateMinimumInitialContributionAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_MINIMUM_INITIAL_CONTRIBUTION_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_MINIMUM_INITIAL_CONTRIBUTION_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'regularMinimumGrantAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_MINIMUM_GRANT_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_MINIMUM_GRANT_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'privateMinimumGrantAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_MINIMUM_GRANT_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_MINIMUM_GRANT_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'regularNotificationLimitRemainderAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_NOTIFICATION_LIMIT_REMAINDER_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.REGULAR_NOTIFICATION_LIMIT_REMAINDER_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'privateNotificationLimitRemainderAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_NOTIFICATION_LIMIT_REMAINDER_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PRIVATE_NOTIFICATION_LIMIT_REMAINDER_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'blankBookletMaxAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BLANK_BOOKLET_MAX_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BLANK_BOOKLET_MAX_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'extraBookletPercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.EXTRA_BOOKLET_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.EXTRA_BOOKLET_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:10',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'expressMailFeeAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.EXPRESS_MAIL_FEE_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.EXPRESS_MAIL_FEE_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'grantMinimumRegularAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.GRANT_MINIMUM_REGULAR_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.GRANT_MINIMUM_REGULAR_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.DELIVERY_METHOD_TYPE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.DELIVERY_METHOD_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'grantAcknowledgmentTypeId',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'grantPurposeTypeId',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.GRANT_PURPOSE_TYPE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.GRANT_PURPOSE_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                }
            ],
        };
    }
}