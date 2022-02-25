import { FormBase } from 'core/components';

export default class CharityUploadLogoForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'coreMediaVaultEntryId',
                    rules: 'string'
                },
            ]
        };
    }
}