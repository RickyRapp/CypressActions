import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class DonorNoteCreateEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    rules: 'string'
                },
                {
                    name: 'note',
                    label: localizationService.t('DONORNOTECREATEEDITFORM.NOTE'),
                    rules: 'required|string'
                }
            ]
        };
    }
};
