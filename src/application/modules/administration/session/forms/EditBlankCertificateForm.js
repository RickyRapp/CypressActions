import { FormBase } from 'core/components';

export default class EditBlankCertificateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isCertificateApproved',
                    label: 'SESSION.EDIT.FIELDS.IS_REVIEWED_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.IS_REVIEWED_PLACEHOLDER',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'blankCertificateValue',
                    label: 'SESSION.EDIT.FIELDS.BLANK_CERTIFICATE_AMOUNT_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.BLANK_CERTIFICATE_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|blankCertificateValueDonorBalance|blankCertificateValueMaxBooklet',
                    extra: {
                        type: 'c2'
                    }
                }
            ]
        };
    }
}