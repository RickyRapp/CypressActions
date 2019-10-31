import { FormBase } from 'core/components';

export default class SessionInformationCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'key',
                    label: 'SESSION.CREATE.STEP3.FIELDS.KEY_LABEL',
                    placeholder: 'SESSION.CREATE.STEP3.FIELDS.KEY_PLACEHOLDER',
                    rules: 'numeric|digits:5'
                }
            ]
        }
    }
}