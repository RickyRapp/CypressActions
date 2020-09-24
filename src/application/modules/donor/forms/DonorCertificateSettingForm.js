import { FormBase } from 'core/components';

export default class DonorCertificateSettingForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'grantAcknowledgmentTypeId',
                    label: 'DONOR.CERTIFICATE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_LABEL',
                    placeholder: 'DONOR.CERTIFICATE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'grantAcknowledgmentTypeByAmountId',
                    label: 'DONOR.CERTIFICATE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_BY_AMOUNT_LABEL',
                    placeholder: 'DONOR.CERTIFICATE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_BY_AMOUNT_PLACEHOLDER',
                    rules: 'required_with:acknowledgmentByAmount|string'
                },
                {
                    name: 'acknowledgmentByAmount',
                    label: 'DONOR.CERTIFICATE_SETTING.EDIT.FIELDS.ACKNOWLEDGMENT_BY_AMOUNT_LABEL',
                    placeholder: 'DONOR.CERTIFICATE_SETTING.EDIT.FIELDS.ACKNOWLEDGMENT_BY_AMOUNT_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                }
            ]
        };
    }
}