import { FormBase } from 'core/components';
import { localizationService } from 'core/services';

export default class BookletCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'items',
                'items[].count',
                'items[].denominationTypeId'
            ],
            labels: {
                'items': localizationService.t('BOOKLETCREATEFORM.ITEMS'),
                'items[].count': localizationService.t('BOOKLETCREATEFORM.ITEMS.COUNT'),
                'items[].denominationTypeId': localizationService.t('BOOKLETCREATEFORM.ITEMS.DENOMINATIONTYPE'),
            },
            rules: {
                'items[].count': 'required|numeric|min:1|max:1000',
                'items[].denominationTypeId': 'required|string'
            },
            initials: {
                'items': [{
                    'count': '',
                    'denominationTypeId': '',
                }]
            },
            defaults: {
                'items': [{
                    'count': '',
                    'denominationTypeId': '',
                }]
            },
            values: {
                'items': [{
                    'count': '',
                    'denominationTypeId': '',
                }]
            }
        };
    }
};