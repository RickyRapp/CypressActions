import { FormBase } from 'core/components';

export default class DonorNotePutForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
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
                'id': 'required|string',
                'donorAccountId': 'required|string',
                'note': 'required|string'
            }
        };
    }
};