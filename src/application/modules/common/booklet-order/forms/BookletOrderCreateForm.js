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
                'deliveryMethodTypeId',
                'customizedAddressLine1',
                'customizedAddressLine2',
                'customizedCity',
                'customizedState',
                'customizedZipCode',
                'customizedExpirationDate',
                'orderFolder'
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
                'customizedAddressLine1': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_ADDRESS_LINE_1_PLACEHOLDER',
                'customizedAddressLine2': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_ADDRESS_LINE_2_PLACEHOLDER',
                'customizedCity': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_CITY_PLACEHOLDER',
                'customizedState': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_STATE_PLACEHOLDER',
                'customizedZipCode': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_ZIPCODE_PLACEHOLDER',
                'customizedExpirationDate': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_EXPIRATION_DATE_PLACEHOLDER',
                'deliveryMethodTypeId': 'BOOKLET_ORDER.CREATE.FIELDS.DELIVERY_METHOD_TYPE_LABEL'
            },
            rules: {
                'customizedName': 'string|max:30',
                'shippingAddressLine1': 'required|string|max:30',
                'shippingAddressLine2': 'string|max:30',
                'shippingCity': 'required|string',
                'shippingState': 'required|string',
                'shippingZipCode': 'required|string',
                'deliveryMethodTypeId': 'required|string',
                'isCustomizedBook': 'required|boolean',
                'orderFolder': 'boolean'
            },
            types: {
                'isCustomizedBook': 'checkbox',
                'deliveryMethodTypeId': 'radio',
                'orderFolder': 'checkbox'
            },
            disabled: {
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