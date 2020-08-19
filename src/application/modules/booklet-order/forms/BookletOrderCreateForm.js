import { FormBase } from 'core/components';

export default class BookletOrderCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'donorId',
                // 'deliveryMethodTypeId',
                'checkOrderUrl',
                // 'sendNotificationEmail',
                'bookletOrderContents',
                'bookletOrderContents[].bookletCount',
                'bookletOrderContents[].bookletTypeId',
                'bookletOrderContents[].certificateContents[]',
                'bookletOrderContents[].certificateContents[].denominationTypeId',

            ],
            labels: {
                // 'deliveryMethodTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.DELIVERY_METHOD_TYPE_LABEL',
                // 'sendNotificationEmail': 'BOOKLET_ORDER.CREATE.FIELDS.SEND_NOTIFICATION_EMAIL_LABEL',
                'bookletOrderContents[].bookletCount': 'BOOKLET_ORDER.CREATE.FIELDS.BOOKLET_COUNT_LABEL',
                'bookletOrderContents[].bookletTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.BOOKLET_TYPE_LABEL',
                'bookletOrderContents[].certificateContents[].denominationTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.DENOMINATION_TYPE_LABEL',
            },
            rules: {
                'donorId': 'required|string',
                // 'deliveryMethodTypeId': 'required|string',
                'checkOrderUrl': 'required|string',
                // 'sendNotificationEmail': 'required|boolean',
                'bookletOrderContents[].bookletCount': 'required|integer|min:1|max:1000',
                'bookletOrderContents[].bookletTypeId': 'required|string',
                'bookletOrderContents[].certificateContents[].denominationTypeId': 'required|string'
            },
            extra: {
                'bookletOrderContents[].bookletCount':
                {
                    type: 'n0',
                    step: 1
                }
            }
        };
    }
}