import { FormBase } from 'core/components';

export default class BankCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'BANK.CREATE.FIELDS.NAME_LABEL',
                    placeholder: 'BANK.CREATE.FIELDS.NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'description',
                    label: 'BANK.CREATE.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'BANK.CREATE.FIELDS.DESCRIPTION_PLACEHOLDER',
                    rules: 'required|string'
                }
            ]
        };
    }
}