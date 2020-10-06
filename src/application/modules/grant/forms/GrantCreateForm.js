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
                    name: 'charityId',
                    label: 'GRANT.CREATE.FIELDS.CHARITY_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.CHARITY_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,false|string'
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
                    name: 'additionalInformation',
                    placeholder: 'GRANT.CREATE.FIELDS.ADDITIONAL_INFORMATION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'noteToAdministrator',
                    placeholder: 'GRANT.CREATE.FIELDS.NOTE_TO_ADMINISTRATOR_PLACEHOLDER',
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
                    name: 'startFutureDate',
                    label: 'GRANT.CREATE.FIELDS.START_FUTURE_DATE_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.START_FUTURE_DATE_PLACEHOLDER',
                    rules: `required_if:isRecurring,false|min_date:${moment().format('YYYY-MM-DD')}`,
                    type: 'date',
                    value: moment().format('YYYY-MM-DD'),
                    options: {
                        validateOnChange: false,
                    }
                },
                {
                    name: 'isRecurring',
                    label: 'GRANT.CREATE.FIELDS.IS_RECURRING_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'recurringDate',
                    placeholder: 'GRANT.CREATE.FIELDS.RECURRING_DATE_PLACEHOLDER',
                    rules: `required_if:isRecurring,true|min_date:${moment().add(1, 'days').format('YYYY-MM-DD')}`,
                    type: 'date',
                    options: {
                        validateOnChange: false,
                    }
                },
                {
                    name: 'grantScheduleTypeId',
                    placeholder: 'GRANT.CREATE.FIELDS.GRANT_SCHEDULE_TYPE_PLACEHOLDER',
                    rules: 'required_if:isRecurring,true|string'
                },
                {
                    name: 'endDate',
                    rules: `required_if:isRecurring,true|min_date:${moment().add(1, 'days').format('YYYY-MM-DD')}`, //TODO not working with non required field -> returns invalid date
                    type: 'date'
                },
                {
                    name: 'numberOfPayments',
                    placeholder: 'GRANT.CREATE.FIELDS.NUMBER_OF_PAYMENTS_PLACEHOLDER',
                    rules: 'required_if:isRecurring,true|numeric',
                    type: 'integer'
                },
                {
                    name: 'noEndDate',
                    label: 'GRANT.CREATE.FIELDS.NO_END_DATE_LABEL',
                    rules: 'required_if:isRecurring,true|boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'isNewCharity',
                    label: 'GRANT.CREATE.FIELDS.IS_NEW_CHARITY_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'charityName',
                    label: 'CHARITY.CREATE.FIELDS.NAME_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.NAME_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,true|string'
                },
                {
                    name: 'charityTaxId',
                    label: 'CHARITY.CREATE.FIELDS.TAX_ID_LABEL',
                    rules: 'required_if:isNewCharity,true|string|size:9',
                    extra: {
                        format: '##-#######'
                    }
                },
                {
                    name: 'charityDba',
                    label: 'CHARITY.CREATE.FIELDS.DBA_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.DBA_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityTypeId',
                    label: 'CHARITY.CREATE.FIELDS.CHARITY_TYPE_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CHARITY_TYPE_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,true|string'
                },
                {
                    name: 'charityAddressLine1',
                    label: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_1_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_1_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,true|string'
                },
                {
                    name: 'charityAddressLine2',
                    label: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_2_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.ADDRESS_LINE_2_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityCity',
                    label: 'ADDRESS.CREATE.FIELDS.CITY_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.CITY_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,true|string'
                },
                {
                    name: 'charityState',
                    label: 'ADDRESS.CREATE.FIELDS.STATE_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.STATE_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,true|string'
                },
                {
                    name: 'charityZipCode',
                    label: 'ADDRESS.CREATE.FIELDS.ZIPCODE_LABEL',
                    placeholder: 'ADDRESS.CREATE.FIELDS.ZIPCODE_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,true|string'
                },
                {
                    name: 'charityIsInternationalCharity',
                    label: 'GRANT.CREATE.FIELDS.INTERNATIONAL_COMPANY_LABEL',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'charityContactName',
                    label: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,true|string'
                },
                {
                    name: 'charityContactEmail',
                    label: 'EMAIL_ADDRESS.CREATE.FIELDS.EMAIL_LABEL',
                    placeholder: 'EMAIL_ADDRESS.CREATE.FIELDS.EMAIL_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,true|email'
                },
                {
                    name: 'charityContactNumber',
                    label: 'PHONE_NUMBER.CREATE.FIELDS.NUMBER_LABEL',
                    placeholder: 'PHONE_NUMBER.CREATE.FIELDS.NUMBER_PLACEHOLDER',
                    rules: 'required_if:isNewCharity,true|string',
                    extra: {
                        format: '(###) ###-####'
                    }
                }
            ]
        };
    }
}