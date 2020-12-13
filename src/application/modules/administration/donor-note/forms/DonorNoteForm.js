import { FormBase } from 'core/components';

export default class DonorNoteForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'note',
                    label: 'DONOR_NOTE.FIELDS.NOTE_LABEL',
                    placeholder: 'DONOR_NOTE.FIELDS.NOTE_PLACEHOLDER',
                    rules: 'required|string'
                }
            ]
        };
    }
}