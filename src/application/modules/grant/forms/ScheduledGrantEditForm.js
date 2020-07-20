import { FormBase } from 'core/components';
import moment from 'moment';

export default class ScheduledGrantEditForm extends FormBase {
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
                    name: 'donorId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.AMOUNT_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'grantPurposeTypeId',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.GRANT_PURPOSE_TYPE_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.GRANT_PURPOSE_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'grantAcknowledgmentTypeId',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'charityId',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.CHARITY_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.CHARITY_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'additionalInformation',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.ADDITIONAL_INFORMATION_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.ADDITIONAL_INFORMATION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'purposeMemberName',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.PURPOSE_MEMBER_NAME_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.PURPOSE_MEMBER_NAME_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityEventAttending',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.CHARITY_EVENT_LABEL',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'grantScheduleTypeId',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.GRANT_SCHEDULE_TYPE_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.GRANT_SCHEDULE_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'startFutureDate',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.START_FUTURE_DATE_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.START_FUTURE_DATE_PLACEHOLDER',
                    rules: `required|min_date:${moment().add(1, 'days').format('YYYY-MM-DD')}`,
                    type: 'date'
                },
                {
                    name: 'name',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.NAME_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.NAME_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'endDate',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.END_DATE_LABEL',
                    rules: `min_date:${moment().add(2, 'days').format('YYYY-MM-DD')}`, //TODO not working with non required field -> returns invalid date
                    type: 'date'
                },
                {
                    name: 'numberOfPayments',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.NUMBER_OF_PAYMENTS_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.NUMBER_OF_PAYMENTS_PLACEHOLDER',
                    rules: 'numeric|min:1',
                    type: 'integer'
                },
                {
                    name: 'noEndDate',
                    label: 'SCHEDULED_GRANT.EDIT.FIELDS.NO_END_DATE_LABEL',
                    placeholder: 'SCHEDULED_GRANT.EDIT.FIELDS.NO_END_DATE_PLACEHOLDER',
                    rules: 'boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}