import { FormBase } from 'core/components';
import moment from 'moment';

export default class GrantRequestCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'amount',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY_GIVING_CARD.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'cardNumber',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.CARD_NUMBER_LABEL',
                    rules: 'required|string|size:16',
                    options: {
                        validateOnChange: false
                    },
                    extra: {
                        format: '#### #### #### ####'
                    }
                },
                {
                    name: 'expirationDate',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.EXPIRATION_DATE_LABEL',
                    placeholder: 'CHARITY_GIVING_CARD.CREATE.FIELDS.EXPIRATION_DATE_PLACEHOLDER',
                    rules: 'required|string|size:4',
                    options: {
                        validateOnChange: false
                    },
                    extra: {
                        format: (val) => {
                            const limit = (val, max) => {
                                if (val.length === 1 && val[0] > max[0]) {
                                    val = '0' + val;
                                }

                                if (val.length === 2) {
                                    if (Number(val) === 0) {
                                        val = '01';

                                        //this can happen when user paste number
                                    } else if (val > max) {
                                        val = max;
                                    }
                                }

                                return val;
                            }

                            let month = limit(val.substring(0, 2), '12');
                            let year = val.substring(2, 4);

                            return month + (year.length ? '/' + year : '');
                        },
                        mask: ['M', 'M', 'Y', 'Y']
                    }
                },
                {
                    name: 'cvv',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.CVV_LABEL',
                    rules: 'required|string|size:3',
                    options: {
                        validateOnChange: false
                    },
                    extra: {
                        format: '###'
                    }
                },
                {
                    name: 'note',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.NOTE_LABEL',
                    placeholder: 'CHARITY_GIVING_CARD.CREATE.FIELDS.NOTE_PLACEHOLDER',
                    rules: 'string'
                },
                {
					name: 'isRecurring',
					label: 'GRANT.CREATE.FIELDS.IS_RECURRING_LABEL',
					rules: 'required|boolean',
					type: 'checkbox',
					value: false,
				},
				{
					name: 'recurringDate',
					label: 'GRANT.CREATE.FIELDS.RECURRING_DATE_LABEL',
					rules: `required_if:isRecurring,true|min_date:${moment()
						.add(1, 'days')
						.format('YYYY-MM-DD')}`,
					type: 'date',
					options: {
						validateOnChange: false,
					},
				},
				{
					name: 'grantScheduleTypeId',
					label: 'GRANT.CREATE.FIELDS.GRANT_SCHEDULE_TYPE_LABEL',
					placeholder: 'GRANT.CREATE.FIELDS.GRANT_SCHEDULE_TYPE_PLACEHOLDER',
					rules: 'required_if:isRecurring,true|string',
				},
				{
					name: 'endDate',
					rules: `min_date:${moment()
						.add(1, 'days')
						.format('YYYY-MM-DD')}`, //TODO not working with non required field -> returns invalid date
					type: 'date',
				},
				{
					name: 'numberOfPayments',
					placeholder: 'GRANT.CREATE.FIELDS.NUMBER_OF_PAYMENTS_PLACEHOLDER',
					rules: 'numeric|min:1',
					type: 'integer',
				},
				{
					name: 'noEndDate',
					label: 'GRANT.CREATE.FIELDS.NO_END_DATE_LABEL',
					rules: 'boolean',
					type: 'checkbox',
					value: false,
				}
            ]
        };
    }
}