import { FormBase } from 'core/components';

export default class ReconcileEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isCashed',
                    label: 'RECONCILE.CHECK.EDIT.FIELDS.CHECK_CASHED_LABEL',
                    placeholder: 'RECONCILE.EDIT.FIELDS.CHECK_CASHED_PLACEHOLDER',
                    rules: 'required|boolean'
                },
                {
                    name: 'description',
                    label: 'RECONCILE.EDIT.FIELDS.RECONCILE_DESCRIPTION_LABEL',
                    placeholder: 'RECONCILE.EDIT.FIELDS.RECONCILE_DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
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