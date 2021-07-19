import { FormBase } from 'core/components';

export default class BookletExportForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'codeStart',
                    rules: 'number'
                },
                {
                    name: 'codeEnd',
                    rules: 'number'
                }
            ]
        };
    }
}