import { FormBase } from 'core/components';

export default class BookletOrderCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'shippingAddressLine1',
                'shippingAddressLine2',
                'shippingCity',
                'shippingState',
                'shippingZipCode',
                'isCustomizedBook',
                'customizedName',
                'deliveryMethodTypeId'
            ],
            labels: {
                'shippingAddressLine1': 'BOOKLET_ORDER.CREATE.FIELDS.ADDRESS_LINE_1_LABEL',
                'shippingAddressLine2': 'BOOKLET_ORDER.CREATE.FIELDS.ADDRESS_LINE_2_LABEL',
                'shippingCity': 'BOOKLET_ORDER.CREATE.FIELDS.CITY_LABEL',
                'shippingState': 'BOOKLET_ORDER.CREATE.FIELDS.STATE_LABEL',
                'shippingZipCode': 'BOOKLET_ORDER.CREATE.FIELDS.ZIPCODE_LABEL',
                'isCustomizedBook': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZE_YOUR_BOOKS_LABEL',
                'deliveryMethodTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.DELIVERY_METHOD_TYPE_LABEL'
            },
            placeholders: {
                'customizedName': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_NAME_PLACEHOLDER',
                'deliveryMethodTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.DELIVERY_METHOD_TYPE_LABEL'
            },
            rules: {
                'shippingAddressLine1': 'required|string',
                'shippingAddressLine2': 'string',
                'shippingCity': 'required|string',
                'shippingState': 'required|string',
                'shippingZipCode': 'required|string',
                'deliveryMethodTypeId': 'required|string',
                'isCustomizedBook': 'required|boolean'
            },
            types: {
                'isCustomizedBook': 'checkbox',
                'deliveryMethodTypeId': 'radio'
            },
            disabled: {
                'customizedName': true,
                'shippingAddressLine1': true,
                'shippingAddressLine2': true,
                'shippingCity': true,
                'shippingState': true,
                'shippingZipCode': true
            },
            values: {
                'isCustomizedBook': false
            }
        };
    }
}