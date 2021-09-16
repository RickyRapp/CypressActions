import { FormBase } from 'core/components';

export default class DonorEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'blankBookletMaxAmount',
                    label: 'DONOR.ACCOUNT_SETTING_FIELDS.BLANK_BOOKLET_MAX_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTING_FIELDS.BLANK_BOOKLET_MAX_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'lineOfCredit',
                    label: 'DONOR.ACCOUNT_SETTING_FIELDS.LINE_OF_CREDIT_LABEL',
                    placeholder: 'DONOR.ACCOUNT_SETTING_FIELDS.LINE_OF_CREDIT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                }
            ]
        };
    }
}
