import { FormBase } from 'core/components';

export default class CreditDebitCreateForm extends FormBase {
	constructor(hooks) {
		super(hooks);
	}

	setup() {
		return {
			fields: [
				{
					name: 'amount',
					label: 'CREDIT_DEBIT.CREATE.FIELDS.AMOUNT_LABEL',
					placeholder: 'CREDIT_DEBIT.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
					rules: 'required|numeric|min:1',
					extra: {
						type: 'c2',
					},
				},
				{
					name: 'description',
					label: 'CREDIT_DEBIT.CREATE.FIELDS.DESCRIPTION_LABEL',
					placeholder: 'CREDIT_DEBIT.CREATE.FIELDS.DESCRIPTION_PLACEHOLDER',
					rules: 'required|string|max:250',
				},
			],
		};
	}
}