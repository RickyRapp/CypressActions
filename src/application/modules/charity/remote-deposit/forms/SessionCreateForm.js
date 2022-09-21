import { FormBase } from 'core/components';

export default class SessionCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'key',
                    rules: 'numeric'
                },
                {
                    name: 'charityId',
                    label: 'SESSION.EDIT.FIELDS.CHARITY_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.CHARITY_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'language',
                    label: 'SESSION.EDIT.FIELDS.FULL_NAME_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.FULL_NAME_PLACEHOLDER',
                    rules: 'string',
                    value: 'eng'
                },
                {
                    name: 'fullName',
                    label: 'SESSION.EDIT.FIELDS.FUNDRAISER_NAME_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.FUNDRAISER_NAME_PLACEHOLDER',
                    rules: 'required|string|max:25'
                },
                {
                    name: 'email',
                    label: 'SESSION.EDIT.FIELDS.EMAIL_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.EMAIL_PLACEHOLDER'
                },
                {
                    name: 'description',
                    label: 'SESSION.EDIT.FIELDS.DESCRIPTION_LABEL',
                    placeholder: 'SESSION.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'addressLine1',
                    label: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_1_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'required|string',
                },
                {
                    name: 'addressLine2',
                    label: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_2_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string',
                },
                {
                    name: 'city',
                    label: 'ADDRESS.CREATE.FIELDS.CITY_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.CITY_PLACEHOLDER',
                    rules: 'required|string',
                },
                {
                    name: 'state',
                    label: 'ADDRESS.CREATE.FIELDS.STATE_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.STATE_PLACEHOLDER',
                    rules: 'required|string',
                },
                {
                    name: 'zipCode',
                    label: 'ADDRESS.CREATE.FIELDS.ZIPCODE_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.ZIPCODE_PLACEHOLDER',
                    rules: 'required|string',
                },
                {
                    name: 'cardNumber',
                    label: 'Giving card number',
                    placeholder: 'Giving card number',
                    rules: 'string|size:16'
                },
                {
                    name: 'amount',
                    label: 'Grant Amount',
                    placeholder: 'Grant Amount',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'checkCount',
                    label: 'Count of checks',
                    placeholder: 'Count of checks',
                    rules: 'numeric|min:1',
                },
                {
                    name: 'estimatedAmount',
                    label: 'Estimated Amount',
                    placeholder: 'Estimated Amount',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'note',
                    label: 'Note',
                    placeholder: 'Note',
                    rules: 'string'
                },
                {
                    name: 'taxId',
                    label: 'Tax Id',
                    rules: 'string|size:9',
                    extra: {
                        format: '##-#######'
                    }
                }
            ]
        };
    }
}