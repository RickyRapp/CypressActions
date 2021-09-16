import { FormBase } from 'core/components';

export default class TestReportCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'TEST.TEST_REPORT.CREATE.FIELDS.NAME_LABEL',
                    placeholder: 'TEST.TEST_REPORT.CREATE.FIELDS.NAME_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'isPreviewPrintInModal',
                    label: 'TEST.TEST_REPORT.CREATE.FIELDS.PREVIEW_PRINT_LABEL',
                    placeholder: 'TEST.TEST_REPORT.CREATE.FIELDS.PREVIEW_PRINT_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox',
                    value: false
                }
            ]
        };
    }
}