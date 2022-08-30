import { FormBase } from 'core/components';

export default class CharifyFileVerificationForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'coreMediaVaultEntryId',
                    rules: 'required|string'
                }
            ]
        };
    }
}