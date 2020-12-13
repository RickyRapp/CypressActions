import { FormBase } from 'core/components';

export default class RemoveSessionCertificateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'note',
                    label: 'SESSION.EDIT.FIELDS.NOTE_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.NOTE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'certificateStatusId',
                    label: 'SESSION.EDIT.FIELDS.CERTIFICATE_STATUS_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.CERTIFICATE_STATUS_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'isActive',
                    label: 'SESSION.EDIT.FIELDS.IS_ACTIVE_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.IS_ACTIVE_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'makeRefund',
                    label: 'SESSION.EDIT.FIELDS.MAKE_REFUND_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.MAKE_REFUND_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'makeRefundFee',
                    label: 'SESSION.EDIT.FIELDS.MAKE_REFUND_FEE_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.MAKE_REFUND_FEE_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}