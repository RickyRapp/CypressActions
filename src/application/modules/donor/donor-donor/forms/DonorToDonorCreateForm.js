import { FormBase } from 'core/components';

export default class DonorToDonorCreateForm extends FormBase {
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
					name: 'grantAcknowledgmentTypeId',
					label: 'DONOR-DONOR.CREATE.FIELDS.ACKNOWLEDGMENT_TYPE_LABEL',
					placeholder: 'DONOR-DONOR.CREATE.FIELDS.ACKNOWLEDGMENT_TYPE_PLACEHOLDER',
					rules: 'required|string',
				},
                {
                    name: 'emailOrAccountNumber',
                    label: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_LABEL',
                    placeholder: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'contactInformationName',
                    label: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                    placeholder: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
				{
                    name: 'emailOrAccountNumberAnother',
                    label: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_LABEL',
                    placeholder: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_PLACEHOLDER',
                    rules: 'required_if:anotherRecipientForm,true|string'
                },
                {
                    name: 'contactInformationNameAnother',
                    label: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                    placeholder: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_NAME_PLACEHOLDER',
                    rules: 'required_if:anotherRecipientForm,true|string'
                },
				{
                    name: 'anotherRecipientForm',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_BANK_ACCOUNT_LABEL',
                    placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_BANK_ACCOUNT_PLACEHOLDER',
                    rules: 'boolean',
                    value: false
                },
			],
		};
	}
}
