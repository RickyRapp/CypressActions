import { FormBase } from 'core/components';
import moment from 'moment';

export default class GrantDeclineForm extends FormBase {
	constructor(hooks) {
		super(hooks);
	}

	setup() {
		return {
			fields: [
				{
					name: 'grantId',
					label: 'GRANT.CREATE.FIELDS.CHARITY_LABEL',
					placeholder: 'GRANT.CREATE.FIELDS.CHARITY_PLACEHOLDER',
					rules: 'string',
				},
				{
					name: 'declinationTypeId',
					label: 'GRANT.CREATE.FIELDS.GRANT_PURPOSE_TYPE_LABEL',
					placeholder: 'GRANT.CREATE.FIELDS.GRANT_PURPOSE_TYPE_PLACEHOLDER',
					rules: 'required|string',
				},
			],
		};
	}
}
