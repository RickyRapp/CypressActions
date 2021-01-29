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
                'deliveryMethodTypeId',
                'customizedAddressLine1',
                'customizedAddressLine2',
                'customizedCity',
                'customizedState',
                'customizedZipCode',
                'customizedExpirationDate'
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
                'customizedAddressLine1': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_ADDRESS_LINE_1_PLACEHOLDER',
                'customizedAddressLine2': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_ADDRESS_LINE_2_PLACEHOLDER',
                'customizedCity': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_CITY_PLACEHOLDER',
                'customizedState': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_STATE_PLACEHOLDER',
                'customizedZipCode': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_ZIPCODE_PLACEHOLDER',
                'customizedExpirationDate': 'BOOKLET_ORDER.CREATE.FIELDS.CUSTOMIZED_EXPIRATION_DATE_PLACEHOLDER',
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