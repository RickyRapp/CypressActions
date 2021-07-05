import { FormBase } from 'core/components';

export default class DonorDonorCreateForm extends FormBase {
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
					rules: 'required|numeric|min:100',
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
                    name: 'contactInformationEmail',
                    label: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_LABEL',
                    placeholder: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_EMAIL_PLACEHOLDER',
                    rules: 'required|email'
                },
                {
                    name: 'contactInformationName',
                    label: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                    placeholder: 'DONOR-DONOR.CREATE.FIELDS.CONTACT_INFORMATION_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
			],
		};
	}
}
