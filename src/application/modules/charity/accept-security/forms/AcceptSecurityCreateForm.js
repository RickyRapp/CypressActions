import { FormBase } from 'core/components';

export default class AcceptSecurityCreateForm extends FormBase {
	constructor(hooks) {
		super(hooks);
	}

	setup() {
		return {
			fields: [
				{
					name: 'amount',
					label: 'DONOR-DONOR.CREATE.FIELDS.AMOUNT_LABEL',
					placeholder: 'DONOR-DONOR.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
					rules: 'required|numeric|min:1',
					extra: {
						type: 'c2',
					},
				},
				{
					name: 'brokerageInstitutionId',
					label: 'ACCEPT-SECURITY.CREATE.BROKERAGE_INSTITUTION',
					placeholder: 'ACCEPT-SECURITY.CREATE.BROKERAGE_INSTITUTION',
					rules: 'required|string',
				},
                {
					name: 'securityTypeId',
					label: 'ACCEPT-SECURITY.CREATE.SECURITY_TYPE',
					placeholder: 'ACCEPT-SECURITY.CREATE.SECURITY_TYPE',
					rules: 'required|string',
				},
                {
					name: 'securitySymbol',
					label: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_SYMBOL_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_SYMBOL_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'numberOfShares',
					label: 'CONTRIBUTION.CREATE.FIELDS.NUMBER_OF_SHARES_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.NUMBER_OF_SHARES_PLACEHOLDER',
					rules: 'integer|min:0',
				},
			],
		};
	}
}
