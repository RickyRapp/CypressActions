import { FormBase } from 'core/components';

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
                'items': 'BOOKLET.CREATE.FIELDS.ITEMS_LABEL',
                'items[].count': 'BOOKLET.CREATE.FIELDS.COUNT_LABEL',
                'items[].denominationTypeId': 'BOOKLET.CREATE.FIELDS.DENOMINATION_LABEL',
            },
            rules: {
                'items[].count': 'required|numeric|min:1|max:1000',
                'items[].denominationTypeId': 'required|string'
            }
        };
    }
}