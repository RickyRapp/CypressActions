import { FormBase } from 'core/components';

export default class BookletOrderReviewForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
                'bookletOrderItems',
                'bookletOrderItems.id',
                'bookletOrderItems[].id',
                'bookletOrderItems[].denominationTypeId',
                'bookletOrderItems[].count',
                'bookletOrderItems[].bookletOrderItemBooklets',
                'bookletOrderItems[].bookletOrderItemBooklets[].bookletId',
                'bookletOrderItems[].bookletOrderItemBooklets[].booklet',
                'bookletOrderItems[].bookletOrderItemBooklets[].booklet.code',
            ],
            labels: {
                'bookletOrderItems': 'BOOKLETORDERREVIEWFORM.ITEMS',
                'bookletOrderItems[].bookletOrderItemBooklets': 'BOOKLETORDERREVIEWFORM.ITEMS',
                'bookletOrderItems[].bookletOrderItemBooklets[].bookletId': 'BOOKLETORDERREVIEWFORM.ITEMS'
            },
            rules: {
                'id': 'required|string',
                'bookletOrderItems.id': 'required|string',
                'bookletOrderItems[].id': 'required|string',
                'bookletOrderItems[].count': 'numeric',
                'bookletOrderItems[].denominationType.sortOrder': 'numeric',
                'bookletOrderItems[].bookletOrderItemBooklets[].bookletId': 'required|string',
                'bookletOrderItems[].bookletOrderItemBooklets[].booklet.code': 'numeric'
            }
        };
    }
}