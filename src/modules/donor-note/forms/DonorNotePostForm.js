import { FormBase } from 'core/components';

export default class DonorNotePostForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'donorAccountId',
                'note'
            ],

            labels: {
                'note': 'Note'
            },

            placeholders: {
                'note': 'Enter note'
            },

            rules: {
                'donorAccountId': 'required|string',
                'descripnotetion': 'required|string'
            }
        };
    }
};