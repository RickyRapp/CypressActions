import { FormBase } from 'core/components';

export default class BookletCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'items',
                'items[].bookletTypeId',
                'items[].bookletCount',
                'items[].bookletContents',
                'items[].bookletContents[].certificateCount',
                'items[].bookletContents[].denominationTypeId'
            ],
            labels: {
                'items': 'BOOKLET.CREATE.FIELDS.ITEMS_LABEL',
                'items[].bookletTypeId': 'BOOKLET.CREATE.FIELDS.BOOKLET_TYPE_LABEL',
                'items[].bookletCount': 'BOOKLET.CREATE.FIELDS.BOOKLET_COUNT_LABEL',
                'items[].bookletContents': 'BOOKLET.CREATE.FIELDS.ITEMS_LABEL',
                'items[].bookletContents[].certificateCount': 'BOOKLET.CREATE.FIELDS.COUNT_LABEL',
                'items[].bookletContents[].denominationTypeId': 'BOOKLET.CREATE.FIELDS.DENOMINATION_LABEL',
            },
            rules: {
                'items[].bookletTypeId': 'required|string',
                'items[].bookletCount': 'required|integer|min:1|max:2000',
                'items[].bookletContents[].certificateCount': 'required|integer|min:1|max:50',
                'items[].bookletContents[].denominationTypeId': 'required|string'
            },
            extra: {
                'items[].bookletCount':
                {
                    type: 'n0',
                    step: 1
                },
                'items[].bookletContents[].certificateCount':
                {
                    type: 'n0',
                    step: 1
                }
            }
        };
    }
}