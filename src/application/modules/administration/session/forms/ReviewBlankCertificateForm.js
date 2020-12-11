import { FormBase } from 'core/components';

export default class ReviewBlankCertificateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isApproved',
                    rules: 'boolean'
                }
            ]
        };
    }
}