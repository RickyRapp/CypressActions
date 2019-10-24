import { FormBase } from 'core/components';
import moment from 'moment';

export default class GrantCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    rules: 'string'
                },
                {
                    name: 'donorAccountId',
                    rules: 'required|string'
                },
                {
                    name: 'accountTypeId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: 'GRANT.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'grantPurposeTypeId',
                    label: 'GRANT.CREATE.FIELDS.GRANT_PURPOSE_TYPE_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.GRANT_PURPOSE_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'grantAcknowledgmentTypeId',
                    label: 'GRANT.CREATE.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'charityId',
                    label: 'GRANT.CREATE.FIELDS.CHARITY_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.CHARITY_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'additionalInformation',
                    label: 'GRANT.CREATE.FIELDS.ADDITIONAL_INFORMATION_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.ADDITIONAL_INFORMATION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'purposeMemberName',
                    label: 'GRANT.CREATE.FIELDS.PURPOSE_MEMBER_NAME_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.PURPOSE_MEMBER_NAME_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityEventAttending',
                    label: 'GRANT.CREATE.FIELDS.CHARITY_EVENT_LABEL',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'grantScheduleTypeId',
                    label: 'GRANT.CREATE.FIELDS.GRANT_SCHEDULE_TYPE_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.GRANT_SCHEDULE_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'startFutureDate',
                    label: 'GRANT.CREATE.FIELDS.START_FUTURE_DATE_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.START_FUTURE_DATE_PLACEHOLDER',
                    rules: `required|min_date:${moment().format('YYYY-MM-DD')}`,
                    type: 'date'
                },
                {
                    name: 'name',
                    label: 'GRANT.CREATE.FIELDS.NAME_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.NAME_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'endDate',
                    label: 'GRANT.CREATE.FIELDS.END_DATE_LABEL',
                    rules: `min_date:${moment().add(1, 'days').format('YYYY-MM-DD')}`, //TODO not working with non required field -> returns invalid date
                    type: 'date'
                },
                {
                    name: 'numberOfPayments',
                    label: 'GRANT.CREATE.FIELDS.NUMBER_OF_PAYMENTS_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.NUMBER_OF_PAYMENTS_PLACEHOLDER',
                    rules: 'numeric',
                    type: 'integer'
                },
                {
                    name: 'noEndDate',
                    label: 'GRANT.CREATE.FIELDS.NO_END_DATE_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.NO_END_DATE_PLACEHOLDER',
                    rules: 'boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}