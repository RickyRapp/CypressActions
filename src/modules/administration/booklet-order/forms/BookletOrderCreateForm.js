import { FormBase } from 'core/components';
import { localizationService } from 'core/services';

export default class BookletOrderCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'sendNotificationEmail',
                'donorAccountId',
                'deliveryMethodTypeId',
                'checkOrderUrl',
                'bookletOrderItems',
                'bookletOrderItems[].count',
                'bookletOrderItems[].denominationTypeId'
            ],
            labels: {
                'sendNotificationEmail': localizationService.t('BOOKLETORDERCREATEFORM.SENDNOTIFICATIONEMAIL'),
                'deliveryMethodTypeId': localizationService.t('BOOKLETORDERCREATEFORM.DELIVERYMETHODTYPEID'),
                'bookletOrderItems': localizationService.t('BOOKLETORDERCREATEFORM.ITEMS'),
                'bookletOrderItems[].count': localizationService.t('BOOKLETORDERCREATEFORM.ITEMS.COUNT'),
                'bookletOrderItems[].denominationTypeId': localizationService.t('BOOKLETORDERCREATEFORM.ITEMS.DENOMINATIONTYPE'),
            },
            rules: {
                'sendNotificationEmail': 'boolean',
                'donorAccountId': 'required|string',
                'checkOrderUrl': 'required_if:sendNotificationEmail,true|string',
                'deliveryMethodTypeId': 'required|string',
                'bookletOrderItems[].count': 'required|numeric|min:1|max:1000',
                'bookletOrderItems[].denominationTypeId': 'required|string'
            },
            initials: {
                'bookletOrderItems': [{
                    'count': '',
                    'denominationTypeId': '',
                }]
            },
            defaults: {
                'bookletOrderItems': [{
                    'count': '',
                    'denominationTypeId': '',
                }]
            },
            values: {
                'bookletOrderItems': [{
                    'count': '',
                    'denominationTypeId': '',
                }]
            },
            types: {
                'sendNotificationEmail': 'checkbox'
            }
        };
    }
};