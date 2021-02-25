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
                {
                    name: 'trackingNumber',
                    label: 'BOOKLET_ORDER.REVIEW.FIELDS.TRACKING_NUMBER_LABEL',
                    rules: 'string'
                },
            ]
        };
    }
}