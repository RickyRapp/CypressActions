import { FormBase } from 'core/components';

export default class DonorAccountCertificateSettingForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'grantAcknowledgmentTypeId',
                    label: 'DONOR_ACCOUNT.CERTIFICATE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_LABEL',
                    placeholder: 'DONOR_ACCOUNT.CERTIFICATE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'grantAcknowledgmentTypeByAmountId',
                    label: 'DONOR_ACCOUNT.CERTIFICATE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_BY_AMOUNT_LABEL',
                    placeholder: 'DONOR_ACCOUNT.CERTIFICATE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_BY_AMOUNT_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'acknowledgmentByAmount',
                    label: 'DONOR_ACCOUNT.CERTIFICATE_SETTING.EDIT.FIELDS.ACKNOWLEDGMENT_BY_AMOUNT_LABEL',
                    placeholder: 'DONOR_ACCOUNT.CERTIFICATE_SETTING.EDIT.FIELDS.ACKNOWLEDGMENT_BY_AMOUNT_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                }
            ]
        };
    }
}