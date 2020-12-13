import { FormBase } from 'core/components';

export default class BookletOrderCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'addressLine1',
                'addressLine2',
                'city',
                'state',
                'zipCode',
                'isCustomizedBook',
                'customizedName',
                'deliveryMethodTypeId'
            ],
            labels: {
                'addressLine1': 'BOOKLET_ORDER.CREATE.FIELDS.ADDRESS_LINE_1_LABEL',
                'addressLine2': 'BOOKLET_ORDER.CREATE.FIELDS.ADDRESS_LINE_2_LABEL',
                'city': 'BOOKLET_ORDER.CREATE.FIELDS.CITY_LABEL',
                'state': 'BOOKLET_ORDER.CREATE.FIELDS.STATE_LABEL',
                'zipCode': 'BOOKLET_ORDER.CREATE.FIELDS.ZIPCODE_LABEL',
                'isCustomizedBook': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZE_YOUR_BOOKS_LABEL',
                'deliveryMethodTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.DELIVERY_METHOD_TYPE_LABEL'
            },
            placeholders: {
                'customizedName': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_NAME_PLACEHOLDER',
                'deliveryMethodTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.DELIVERY_METHOD_TYPE_LABEL'
            },
            rules: {
                'addressLine1': 'required|string',
                'addressLine2': 'string',
                'city': 'required|string',
                'state': 'required|string',
                'zipCode': 'required|string',
                'deliveryMethodTypeId': 'required|string',
                'isCustomizedBook': 'required|boolean'
            },
            types: {
                'isCustomizedBook': 'checkbox',
                'deliveryMethodTypeId': 'radio'
            },
            disabled: {
                'customizedName': true,
                'addressLine1': true,
                'addressLine2': true,
                'city': true,
                'state': true,
                'zipCode': true
            },
            values: {
                'isCustomizedBook': false
            }
        };
    }
}