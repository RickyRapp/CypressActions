import { FormBase } from 'core/components';

export default class DonorToDonorCreateForm extends FormBase {
	constructor(hooks) {
		super(hooks);
	}

	setup() {
		return {
			fields: [
				{
					name: 'donorSenderId',
					label: 'DONOR_DONOR_ADMIN.CREATE.FIELDS.DONOR_FROM',
					placeholder: 'DONOR_DONOR_ADMIN.CREATE.FIELDS.DONOR_FROM_PLACEHOLDER',
					rules: 'required|string',
				},
				{
					name: 'amount',
					label: 'DONOR_DONOR_ADMIN.CREATE.FIELDS.AMOUNT_LABEL',
					placeholder: 'DONOR_DONOR_ADMIN.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
					rules: 'required|numeric|min:100',
					extra: {
						type: 'c2',
					},
				},
				{
					name: 'donorRecipientId',
					label: 'DONOR_DONOR_ADMIN.CREATE.FIELDS.DONOR_TO',
					placeholder: 'DONOR_DONOR_ADMIN.CREATE.FIELDS.DONOR_TO_PLACEHOLDER',
					rules: 'required|string',
				},
				{
					name: 'ignoreInsufficientFunds',
					label: 'DONOR_DONOR_ADMIN.CREATE.FIELDS.IGNORE_INSUFFICIENT_FUNDS',
					rules: 'required|boolean',
					type: 'checkbox',
					value: false,
				},
			],
		};
	}
}
