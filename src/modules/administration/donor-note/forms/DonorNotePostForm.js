import { FormBase } from 'core/components';

export default class DonorNotePostForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'donorAccountId',
                    rules: 'string'
                },
                {
                    name: 'note',
                    label: 'Note',
                    placeholder: 'Enter Note',
                    rules: 'required|string'
                }
            ]
        };
    }
};
