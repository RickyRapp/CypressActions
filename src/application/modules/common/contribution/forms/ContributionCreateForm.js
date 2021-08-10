import { FormBase } from 'core/components';
import moment from 'moment';

export default class ContributionCreateForm extends FormBase {
	constructor(hooks) {
		super(hooks);
	}

	setup() {
		return {
			fields: [
				{
					name: 'amount',
					label: 'CONTRIBUTION.CREATE.FIELDS.AMOUNT_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
					rules: 'required|numeric|min:0',
					extra: {
						type: 'c2',
					},
					options: {
						validateOnChange: false,
					},
					handlers: {
						onBlur: field => () => {
							field.validate({ showErrors: true });
						},
					},
				},
				{
					name: 'paymentTypeId',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYMENT_TYPE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYMENT_TYPE_PLACEHOLDER',
					rules: 'required|string',
					disabled: true,
				},
				{
					name: 'bankAccountId',
					label: 'CONTRIBUTION.CREATE.FIELDS.BANK_ACCOUNT_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.BANK_ACCOUNT_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'isThirdParty',
					label: 'CONTRIBUTION.CREATE.FIELDS.IS_THIRD_PARTY_LABEL',
					rules: 'required|boolean',
					type: 'checkbox',
					value: false,
				},
				{
					name: 'isAgreeToPoliciesAndGuidelines',
					label: 'CONTRIBUTION.CREATE.FIELDS.IS_AGREE_TO_POLICIES_AND_GUIDELINES_LABEL',
					rules: 'required|boolean|accepted',
					type: 'checkbox',
					value: false,
				},
				{
					name: 'checkNumber',
					label: 'CONTRIBUTION.CREATE.FIELDS.CHECK_NUMBER_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.CHECK_NUMBER_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'name',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_NAME_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_NAME_PLACEHOLDER',
					rules: 'required_if:isThirdParty,true|string',
				},
				{
					name: 'addressLine1',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ADDRESS_LINE_1_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ADDRESS_LINE_1_PLACEHOLDER',
					rules: 'required_if:isThirdParty,true|string',
				},
				{
					name: 'addressLine2',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ADDRESS_LINE_2_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ADDRESS_LINE_2_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'city',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_CITY_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_CITY_PLACEHOLDER',
					rules: 'required_if:isThirdParty,true|string',
				},
				{
					name: 'state',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_STATE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_STATE_PLACEHOLDER',
					rules: 'required_if:isThirdParty,true|string',
				},
				{
					name: 'zipCode',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ZIPCODE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_ZIPCODE_PLACEHOLDER',
					rules: 'required_if:isThirdParty,true|string',
				},
				{
					name: 'email',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_EMAIL_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_EMAIL_PLACEHOLDER',
					rules: 'required_if:isThirdParty,true|email',
					options: {
						validateOnChange: false,
					},
					handlers: {
						onBlur: field => () => {
							field.validate({ showErrors: true });
						},
					},
				},
				{
					name: 'number',
					label: 'CONTRIBUTION.CREATE.FIELDS.PAYER_INFORMATION_NUMBER_LABEL',
					rules: 'required_if:isThirdParty,true|string',
					extra: {
						format: '(###) ###-####',
					},
				},
				{
					name: 'brokerageInstitutionId',
					label: 'CONTRIBUTION.CREATE.FIELDS.BROKERAGE_INSTITUTION_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.BROKERAGE_INSTITUTION_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'brokerageInstitutionOther',
					label: 'CONTRIBUTION.CREATE.FIELDS.BROKERAGE_INSTITUTION_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.BROKERAGE_INSTITUTION_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'securityTypeId',
					label: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_TYPE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_TYPE_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'securityTypeOther',
					label: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_TYPE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.SECURITY_TYPE_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'businessTypeId',
					label: 'CONTRIBUTION.CREATE.FIELDS.BUSINESS_TYPE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.BUSINESS_TYPE_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'businessTypeOther',
					label: 'CONTRIBUTION.CREATE.FIELDS.BUSINESS_TYPE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.BUSINESS_TYPE_PLACEHOLDER',
					rules: 'string',
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
					name: 'contributionSettingTypeId',
					label: 'CONTRIBUTION.CREATE.FIELDS.SETTING_TYPE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.SETTING_TYPE_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'settingStartDate',
					label: 'CONTRIBUTION.CREATE.FIELDS.SETTING_START_DATE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.SETTING_START_DATE_PLACEHOLDER',
					rules: `min_date:${moment().format('YYYY-MM-DD')}`,
					type: 'date',
				},
				{
					name: 'propertyTypeId',
					label: 'CONTRIBUTION.CREATE.FIELDS.PROPERTY_TYPE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PROPERTY_TYPE_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'propertyTypeOther',
					label: 'CONTRIBUTION.CREATE.FIELDS.PROPERTY_TYPE_OTHER_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.PROPERTY_TYPE_OTHER_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'collectibleTypeId',
					label: 'CONTRIBUTION.CREATE.FIELDS.COLLECTIBLE_TYPE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.COLLECTIBLE_TYPE_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'collectibleTypeOther',
					label: 'CONTRIBUTION.CREATE.FIELDS.COLLECTIBLE_TYPE_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.COLLECTIBLE_TYPE_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'thirdPartyDonorAdvisedFundId',
					label: 'CONTRIBUTION.CREATE.FIELDS.THIRD_PARTY_DONOR_ADVISED_FUND_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.THIRD_PARTY_DONOR_ADVISED_FUND_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'thirdPartyDonorAdvisedFundOther',
					label: 'CONTRIBUTION.CREATE.FIELDS.THIRD_PARTY_DONOR_ADVISED_FUND_LABEL',
					placeholder: 'CONTRIBUTION.CREATE.FIELDS.THIRD_PARTY_DONOR_ADVISED_FUND_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'thirdPartyDonorAdvisedFundName',
					label: 'Fund holder name',
					placeholder: 'Fund holder name',
					rules: 'string',
				},
				{
					name: 'nameOfEmployment',
					label: 'Name Of Employment',
					placeholder: 'Name Of Employment',
					rules: 'string',
				},
				{
					name: 'payrollCompany',
					label: 'Payroll Company',
					placeholder: 'Payroll Company',
					rules: 'string',
				},
			],
		};
	}
}
