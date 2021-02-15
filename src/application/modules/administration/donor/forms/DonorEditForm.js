import { FormBase } from 'core/components';

export default class DonorEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'firstName',
                    label: 'DONOR.EDIT.FIRST_NAME_LABEL',
                    placeholder: 'DONOR.EDIT.FIRST_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'lastName',
                    label: 'DONOR.EDIT.LAST_NAME_LABEL',
                    placeholder: 'DONOR.EDIT.LAST_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'fundName',
                    label: 'DONOR.EDIT.FUND_NAME_LABEL',
                    placeholder: 'DONOR.EDIT.FUND_NAME_PLACEHOLDER',
                    rules: ['required', 'string']
                },
                {
                    name: 'prefixTypeId',
                    label: 'DONOR.EDIT.PREFIX_TYPE_LABEL',
                    placeholder: 'DONOR.EDIT.PREFIX_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'accountManagerId',
                    label: 'DONOR.EDIT.ACCOUNT_MANAGER_LABEL',
                    placeholder: 'DONOR.EDIT.ACCOUNT_MANAGER_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'securityPin',
                    label: 'DONOR.EDIT.SECURITY_PIN_LABEL',
                    rules: 'required|string|digits:4',
                    extra: {
                        format: '####',
                        mask: '*'
                    }
                }
            ]
        };
    }
}
