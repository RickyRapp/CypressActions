import { FormBase } from 'core/components';

export default class AddressCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'addressLine1',
                    label: 'ADDRESS.ADDRESSLINE1',
                    rules: 'required|string',
                },
                {
                    name: 'addressLine2',
                    label: 'ADDRESS.ADDRESSLINE2',
                    rules: 'string',
                },
                {
                    name: 'city',
                    label: 'ADDRESS.CITY',
                    rules: 'required|string',
                },
                {
                    name: 'state',
                    label: 'ADDRESS.STATE',
                    rules: 'required|string',
                },
                {
                    name: 'zipCode',
                    label: 'ADDRESS.ZIPCODE',
                    rules: 'required|string',
                },
                {
                    name: 'description',
                    label: 'ADDRESS.DESCRIPTION',
                    rules: 'string',
                },
            ]
        }
    };
}