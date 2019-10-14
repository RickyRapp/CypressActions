import { FormBase } from 'core/components';

export const charityAddressFormProperties = {
    fields: [
        {
            name: 'id',
            rules: 'string'
        },
        {
            name: 'addressLine1',
            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_FIELD',
            rules: 'required|string'
        },
        {
            name: 'addressLine2',
            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_FIELD',
            rules: 'string'
        },
        {
            name: 'city',
            label: 'ADDRESS.EDIT.FIELDS.CITY_FIELD',
            rules: 'required|string'
        },
        {
            name: 'state',
            label: 'ADDRESS.EDIT.FIELDS.STATE_FIELD',
            rules: 'required|string'
        },
        {
            name: 'zipCode',
            label: 'ADDRESS.EDIT.FIELDS.ZIPCODE_FIELD',
            rules: 'required|string'
        },
        {
            name: 'description',
            label: 'ADDRESS.EDIT.FIELDS.DESCRIPTION_FIELD',
            rules: 'string'
        }
    ]
}

export default class CharityAddressEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return charityAddressFormProperties;
    }
}
