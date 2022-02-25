import { FormBase } from 'core/components';

export const charityAddressFormProperties = {
    fields: [
        {
            name: 'addressLine1',
            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'addressLine2',
            label: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.ADDRESS_LINE_2_PLACEHOLDER',
            rules: 'string'
        },
        {
            name: 'city',
            label: 'ADDRESS.EDIT.FIELDS.CITY_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.CITY_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'state',
            label: 'ADDRESS.EDIT.FIELDS.STATE_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.STATE_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'zipCode',
            label: 'ADDRESS.EDIT.FIELDS.ZIPCODE_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.ZIPCODE_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'isPrimary',
            label: 'ADDRESS.EDIT.FIELDS.PRIMARY_LABEL',
            placeholder: 'ADDRESS.EDIT.FIELDS.PRIMARY_PLACEHOLDER',
            rules: 'boolean',
            type: 'checkbox'
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
