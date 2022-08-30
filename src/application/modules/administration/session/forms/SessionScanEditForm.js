import { FormBase } from 'core/components';

export default class SessionScanEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'barcode',
                    label: 'Barcode',
                    placeholder: 'Barcode',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: 'Amount',
                    placeholder: 'Amount',
                    rules: 'required|numeric'
                }
            ]
        };
    }
}