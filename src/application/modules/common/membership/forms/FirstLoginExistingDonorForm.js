import { FormBase } from 'core/components';

export default class FirstLoginExistingDonorForm extends FormBase {
	constructor(hooks) {
		super(hooks);
	}

	setup() {
		return {
			fields: [
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
					name: 'password',
					label: 'FIRST_LOGIN_EXISTING_DONOR.PASSWORD_LABEL',
					type: 'password',
					rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
				},
				{
					name: 'confirmPassword',
					label: 'FIRST_LOGIN_EXISTING_DONOR.CONFIRM_PASSWORD_LABEL',
					rules: 'required|string|same:password',
					type: 'password',
				},
				{
					name: 'securityPin',
					label: 'FIRST_LOGIN_EXISTING_DONOR.SECURITY_PIN_LABEL',
					rules: 'required|string|digits:4',
					type: 'password',
					extra: {
						format: '####',
					},
					options: {
						validateOnChange: false,
					},
				},
				{
					name: 'confirmSecurityPin',
					label: 'FIRST_LOGIN_EXISTING_DONOR.SECURITY_PIN_LABEL',
					rules: 'required|string|digits:4|same:securityPin',
					type: 'password',
					extra: {
						format: '####',
					},
					options: {
						validateOnChange: false,
					},
				},
			],
		};
	}
}
