import { FormBase } from 'core/components';

export default class CharityEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'CHARITY.EDIT.FIELDS.NAME_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'taxId',
                    label: 'CHARITY.EDIT.FIELDS.TAX_ID_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.TAX_ID_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'dba',
                    label: 'CHARITY.EDIT.FIELDS.DBA_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.DBA_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityTypeId',
                    label: 'CHARITY.EDIT.FIELDS.CHARITY_TYPE_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.CHARITY_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityStatusId',
                    label: 'CHARITY.EDIT.FIELDS.CHARITY_STATUS_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.CHARITY_STATUS_PLACEHOLDER',
                    rules: 'string'
                }
            ],
        };
    }
}