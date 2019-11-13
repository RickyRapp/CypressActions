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
                    name: 'basicCertificateDeductionPercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_CERTIFICATE_DEDUCTION_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_CERTIFICATE_DEDUCTION_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'basicCertificateFeePercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_CERTIFICATE_FEE_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_CERTIFICATE_FEE_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'premiumCertificateDeductionPercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_CERTIFICATE_DEDUCTION_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_CERTIFICATE_DEDUCTION_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'premiumCertificateFeePercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_CERTIFICATE_FEE_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_CERTIFICATE_FEE_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'basicGrantFeePercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_GRANT_FEE_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_GRANT_FEE_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'premiumGrantFeePercentage',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_GRANT_FEE_PERCENTAGE_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_GRANT_FEE_PERCENTAGE_PLACEHOLDER',
                    rules: 'required|numeric|min:0|max:1',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                },
                {
                    name: 'basicLineOfCreditAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_LINE_OF_CREDIT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_LINE_OF_CREDIT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'premiumLineOfCreditAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_LINE_OF_CREDIT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_LINE_OF_CREDIT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'basicMinimumAdditionalContributionAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_MINIMUM_ADDITIONAL_CONTRIBUTION_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_MINIMUM_ADDITIONAL_CONTRIBUTION_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'premiumMinimumAdditionalContributionAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_MINIMUM_ADDITIONAL_CONTRIBUTION_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_MINIMUM_ADDITIONAL_CONTRIBUTION_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'basicMinimumInitialContributionAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_MINIMUM_INITIAL_CONTRIBUTION_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_MINIMUM_INITIAL_CONTRIBUTION_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'premiumMinimumInitialContributionAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_MINIMUM_INITIAL_CONTRIBUTION_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_MINIMUM_INITIAL_CONTRIBUTION_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'basicMinimumGrantAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_MINIMUM_GRANT_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_MINIMUM_GRANT_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'premiumMinimumGrantAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_MINIMUM_GRANT_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_MINIMUM_GRANT_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'basicNotificationLimitRemainderAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_NOTIFICATION_LIMIT_REMAINDER_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.BASIC_NOTIFICATION_LIMIT_REMAINDER_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'premiumNotificationLimitRemainderAmount',
                    label: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_NOTIFICATION_LIMIT_REMAINDER_AMOUNT_LABEL',
                    placeholder: 'APPLICATION_DEFAULT_SETTING.EDIT.FIELDS.PREMIUM_NOTIFICATION_LIMIT_REMAINDER_AMOUNT_PLACEHOLDER',
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