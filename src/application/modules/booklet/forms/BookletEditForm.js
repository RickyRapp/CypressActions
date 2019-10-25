import { FormBase } from 'core/components';

export default class BookletEditForm extends FormBase {
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
                    name: 'bookletId',
                    rules: 'required|string'
                },
                {
                    name: 'isActive',
                    rules: 'boolean'
                },
                {
                    name: 'certificateStatusId',
                    rules: 'string'
                },
                {
                    name: 'note',
                    rules: 'string'
                }
            ]
        };
    }
}