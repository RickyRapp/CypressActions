import { FormBase } from 'core/components';

export default class ProcessorsCompaniesCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'PROCESSING_COMPANY.CREATE.NAME_LABEL',
                    placeholder: 'PROCESSING_COMPANY.CREATE.NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'description',
                    label: 'PROCESSING_COMPANY.CREATE.DESCRIPTION_LABEL',
                    placeholder: 'PROCESSING_COMPANY.CREATE.DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}