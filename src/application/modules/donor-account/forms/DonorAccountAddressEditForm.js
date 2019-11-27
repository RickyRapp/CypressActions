import { FormBase } from 'core/components';

export const donorAccountAddressFormProperties = {
    fields: [
        {
            name: 'id',
            rules: 'string'
        },
        {
            name: 'addressLine1',
            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_FIELD_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_FIELD_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'addressLine2',
            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_FIELD_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_FIELD_PLACEHOLDER',
            rules: 'string'
        },
        {
            name: 'city',
            label: 'ADDRESS.EDIT.FIELDS.CITY_FIELD_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.CITY_FIELD_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'state',
            label: 'ADDRESS.EDIT.FIELDS.STATE_FIELD_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.STATE_FIELD_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'zipCode',
            label: 'ADDRESS.EDIT.FIELDS.ZIPCODE_FIELD_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.ZIPCODE_FIELD_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'description',
            label: 'ADDRESS.EDIT.FIELDS.DESCRIPTION_FIELD_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.DESCRIPTION_FIELD_PLACEHOLDER',
            rules: 'string'
        }
    ]
}

export default class DonorAccountAddressEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return donorAccountAddressFormProperties;
    }
}
