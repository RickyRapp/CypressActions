import { FormBase } from 'core/components';
import { localizationService } from 'core/services';

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
                'bookletOrderItems[].denominationType',
                'bookletOrderItems[].denominationType.sortOrder',
                'bookletOrderItems[].count',
                'bookletOrderItems[].bookletOrderItemBooklets',
                'bookletOrderItems[].bookletOrderItemBooklets[].bookletId',
                'bookletOrderItems[].bookletOrderItemBooklets[].code',
            ],
            labels: {
                'bookletOrderItems': localizationService.t('BOOKLETORDERREVIEWFORM.ITEMS'),
                'bookletOrderItems[].bookletOrderItemBooklets': localizationService.t('BOOKLETORDERREVIEWFORM.ITEMS'),
                'bookletOrderItems[].bookletOrderItemBooklets[].bookletId': localizationService.t('BOOKLETORDERREVIEWFORM.ITEMS')
            },
            rules: {
                'id': 'required|string',
                'bookletOrderItems.id': 'required|string',
                'bookletOrderItems[].id': 'required|string',
                'bookletOrderItems[].count': 'numeric',
                'bookletOrderItems[].denominationType.sortOrder': 'numeric',
                'bookletOrderItems[].bookletOrderItemBooklets[].bookletId': 'required|string',
                'bookletOrderItems[].bookletOrderItemBooklets[].code': 'numeric'
            }
        };
    }
};