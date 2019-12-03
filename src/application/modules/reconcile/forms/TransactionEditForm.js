import { FormBase } from 'core/components';

export default class TransactionEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'checkCashed',
                    label: 'RECONCILE.EDIT.FIELDS.CHECK_CASHED_LABEL',
                    placeholder: 'RECONCILE.EDIT.FIELDS.CHECK_CASHED_PLACEHOLDER',
                    rules: 'required|boolean'
                },
                {
                    name: 'description',
                    label: 'RECONCILE.EDIT.FIELDS.TRANSACTION_DESCRIPTION_LABEL',
                    placeholder: 'RECONCILE.EDIT.FIELDS.TRANSACTION_DESCRIPTION_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'newCheckNumber',
                    label: 'RECONCILE.EDIT.FIELDS.NEW_CHECK_NUMBER_LABEL',
                    placeholder: 'RECONCILE.EDIT.FIELDS.NEW_CHECK_NUMBER_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}