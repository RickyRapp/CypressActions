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
					name: 'day',
					label: 'FIRST_LOGIN_EXISTING_DONOR.DAY_LABEL',
					placeholder: 'FIRST_LOGIN_EXISTING_DONOR.DAY_PLACEHOLDER',
					rules: 'required|numeric|between:1,31',
					type: 'integer',
				},
				{
					name: 'month',
					label: 'FIRST_LOGIN_EXISTING_DONOR.MONTH_LABEL',
					placeholder: 'FIRST_LOGIN_EXISTING_DONOR.MONTH_PLACEHOLDER',
					rules: 'required|numeric|between:1,12',
					type: 'integer',
				},
				{
					name: 'year',
					label: 'FIRST_LOGIN_EXISTING_DONOR.YEAR_LABEL',
					placeholder: 'FIRST_LOGIN_EXISTING_DONOR.YEAR_PLACEHOLDER',
					rules: `required|numeric|between:1900,${new Date().getFullYear()}`,
					type: 'integer',
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
