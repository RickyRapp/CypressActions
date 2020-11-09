import { FormBase } from 'core/components';

export default class BookletOrderReviewForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    rules: 'required|string'
                },
            ]
        };
    }
}