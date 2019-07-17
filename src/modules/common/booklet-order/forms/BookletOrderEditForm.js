import { FormBase } from 'core/components';
import { localizationService } from 'core/services';

export default class BookletOrderEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'deliveryMethodTypeId',
                'bookletOrderItems',
                'bookletOrderItems[].count',
                'bookletOrderItems[].denominationTypeId'
            ],
            labels: {
                'deliveryMethodTypeId': localizationService.t('BOOKLETORDEREDITFORM.DELIVERYMETHODTYPEID'),
                'bookletOrderItems': localizationService.t('BOOKLETORDEREDITFORM.ITEMS'),
                'bookletOrderItems[].count': localizationService.t('BOOKLETORDEREDITFORM.ITEMS.COUNT'),
                'bookletOrderItems[].denominationTypeId': localizationService.t('BOOKLETORDEREDITFORM.ITEMS.DENOMINATIONTYPE'),
            },
            rules: {
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