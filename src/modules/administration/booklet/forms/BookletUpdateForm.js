import { FormBase } from 'core/components';
import { localizationService } from 'core/services';

export default class BookletUpdateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'bookletId',
                'id',
                'isActive',
                'certificateStatusId',
                'note'
            ],
            rules: {
                'id': 'string',
                'bookletId': 'required|string',
                'isActive': 'boolean',
                'certificateStatusId': 'string',
                'note': 'string'
            }
        };
    }
};