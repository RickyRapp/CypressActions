import { FormBase } from 'core/components';

export default class BookletOrderEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'deliveryMethodTypeId',
                // 'bookletOrderItems',
                // 'bookletOrderItems[].count',
                // 'bookletOrderItems[].denominationTypeId',
                'trackingNumber',
                'id'
            ],
            labels: {
                'deliveryMethodTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.DELIVERY_METHOD_TYPE_LABEL',
                // 'bookletOrderItems': 'BOOKLET_ORDER.CREATE.FIELDS.ITEMS',
                // 'bookletOrderItems[].count': 'BOOKLET_ORDER.CREATE.FIELDS.COUNT_LABEL',
                // 'bookletOrderItems[].denominationTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.DENOMINATION_TYPE_LABEL',
            },
            rules: {
                'deliveryMethodTypeId': 'required|string',
                // 'bookletOrderItems[].count': 'required|numeric|min:1|max:1000',
                // 'bookletOrderItems[].denominationTypeId': 'required|string'
            }
        };
    }
}