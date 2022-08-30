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
					rules: 'required|numeric|min:1000',
					extra: {
						type: 'c2',
					},
				},
				{
					name: 'isAgreeToPoliciesAndGuidelines',
					label: 'CONTRIBUTION.CREATE.FIELDS.IS_AGREE_TO_POLICIES_AND_GUIDELINES_LABEL',
					rules: 'required|boolean|accepted',
					type: 'checkbox',
					value: false,
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
				{
					name: 'name',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_NAME_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_NAME_PLACEHOLDER',
					rules: 'required|string',
				},
				{
					name: 'addressLine1',
					label: 'CONTRIBUTION.CREATE.FIELDS.DONOR_ADDRESS_LINE_1_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.DONOR_ADDRESS_LINE_1_PLACEHOLDER',
					rules: 'required|string',
				},
				{
					name: 'addressLine2',
					label: 'CONTRIBUTION.CREATE.FIELDS.DONOR_ADDRESS_LINE_2_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.DONOR_ADDRESS_LINE_2_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'city',
					label: 'CONTRIBUTION.CREATE.FIELDS.DONOR_CITY_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.DONOR_CITY_PLACEHOLDER',
					rules: 'required|string',
				},
				{
					name: 'zipCode',
					label: 'CONTRIBUTION.CREATE.FIELDS.DONOR_ZIP_CODE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.DONOR_ZIP_CODE_PLACEHOLDER',
					rules: 'required|string',
				},
				{
					name: 'state',
					label: 'CONTRIBUTION.CREATE.FIELDS.DONOR_STATE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.DONOR_STATE_PLACEHOLDER',
					rules: 'required|string',
				}, 
				{
					name: 'email',
					label: 'CONTRIBUTION.CREATE.FIELDS.DONOR_EMAIL_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.DONOR_EMAIL_PLACEHOLDER',
					rules: 'required|email',
				},
				{
					name: 'number',
					label: 'CONTRIBUTION.CREATE.FIELDS.DONOR_PHONE_NUMBER_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.DONOR_PHONE_NUMBER_PLACEHOLDER',
					rules: 'required|string',
                    options: {
                        validateOnChange: true
                    },
                    extra: {
                        format: '(###) ###-####'
                    }
				},
			],
		};
	}
}
