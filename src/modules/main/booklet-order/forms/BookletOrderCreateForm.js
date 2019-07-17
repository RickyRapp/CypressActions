import { FormBase } from 'core/components';
import { localizationService } from 'core/services';

export default class BookletOrderCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'donorAccountId',
                'deliveryMethodTypeId',
                'checkOrderUrl',
                'bookletOrderItems',
                'bookletOrderItems[].count',
                'bookletOrderItems[].denominationTypeId'
            ],
            labels: {
                'deliveryMethodTypeId': localizationService.t('BOOKLETORDERCREATEFORM.DELIVERYMETHODTYPEID'),
                'bookletOrderItems': localizationService.t('BOOKLETORDERCREATEFORM.ITEMS'),
                'bookletOrderItems[].count': localizationService.t('BOOKLETORDERCREATEFORM.ITEMS.COUNT'),
                'bookletOrderItems[].denominationTypeId': localizationService.t('BOOKLETORDERCREATEFORM.ITEMS.DENOMINATIONTYPE'),
            },
            rules: {
                'donorAccountId': 'required|string',
                'checkOrderUrl': 'required|string',
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
            }
        };
    }
};