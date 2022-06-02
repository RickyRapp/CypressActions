import { FormBase } from 'core/components';
import moment from 'moment';

export default class APITestingForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'requestType',
                    label: 'TEST.API_TESTING.FIELDS.REQUEST_TYPE',
                    placeholder: 'TEST.API_TESTING.FIELDS.REQUEST_TYPE',
                    rules: 'string',
                },
                {
                    name: 'fundraisingPlatform',
                    label: 'TEST.API_TESTING.FIELDS.FUNDRAISING_PLATFORM',
                    placeholder: 'TEST.API_TESTING.FIELDS.FUNDRAISING_PLATFORM',
                    rules: 'string',
                },
                {
                    name: 'processRequest',
                    label: 'TEST.API_TESTING.FIELDS.PROCESS_REQUEST',
                    placeholder: 'TEST.API_TESTING.FIELDS.PROCESS_REQUEST',
                    rules: 'string',
                },
                {
                    name: 'accountNumber',
                    label: 'TEST.API_TESTING.FIELDS.ACCOUNT_NUMBER',
                    placeholder: 'TEST.API_TESTING.FIELDS.ACCOUNT_NUMBER',
                    rules: 'numeric|min:0'
                },
                {
                    name: 'taxId',
                    label: 'TEST.API_TESTING.FIELDS.TAX_ID',
                    placeholder: 'TEST.API_TESTING.FIELDS.TAX_ID',
                    rules: 'string'
                },
                {
                    name: 'apiKey',
                    label: 'TEST.API_TESTING.FIELDS.API_KEY',
                    placeholder: 'TEST.API_TESTING.FIELDS.API_KEY',
                    rules: 'string'
                },
                {
                    name: 'amount',
                    label: 'Amount',
                    placeholder: 'Amount',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'startFutureDate',
                    label: 'TEST.API_TESTING.FIELDS.STARTFUTUREDATE',
                    placeholder: 'TEST.API_TESTING.FIELDS.STARTFUTUREDATE',
                    rules: `min_date:${moment().format('YYYY-MM-DD')}`,
                    type: 'date',
                    value: moment().format('YYYY-MM-DD'),
                    options: {
                        validateOnChange: false,
                    },
                },
                {
                    name: 'noEndDate',
                    label: 'No End Date',
                    placeholder: 'No End Date',
                    rules: 'boolean',
                    type: 'checkbox',
                    value: false,
                    handlers: {
                        onChange: (field) => (event) => {
                            debugger;
                            const value = event.target.checked;
                            let rule = 'numeric|min:1';
                            if (value) {

                                rule -= '|required'
                            }
                            else {
                                if (field.container().$('numberOfPayments').rules != 'numeric|min:1') {
                                    field.container().$('numberOfPayments').set('rules', 'numeric|min:1|required');
                                    field.set(event.target.checked);
                                    return;
                                }
                            }

                            field.container().$('numberOfPayments').set('rules', rule);
                            field.container().$('numberOfPayments').validate({ showErrors: true });
                            field.set(event.target.checked);
                        }
                    }
                },
                {
                    name: 'numberOfPayments',
                    label: 'Number Of Payments',
                    placeholder: 'Number Of Payments',
                    rules: 'numeric|min:1',
                    type: 'integer'
                },
                {
                    name: 'grantScheduleType',
                    label: 'TEST.API_TESTING.FIELDS.GRANT_SCHEDULE_TYPE',
                    placeholder: 'TEST.API_TESTING.FIELDS.GRANT_SCHEDULE_TYPE',
                    rules: 'string'
                },
                {
                    name: 'grantPurposeType',
                    label: 'TEST.API_TESTING.FIELDS.PURPOSE_TYPE',
                    placeholder: 'TEST.API_TESTING.FIELDS.PURPOSE_TYPE',
                    rules: 'string'
                },
                {
                    name: 'donor',
                    label: 'TEST.API_TESTING.FIELDS.DONOR',
                    placeholder: 'TEST.API_TESTING.FIELDS.DONOR',
                    rules: 'string'
                },
                {
                    name: 'donorAuthorization',
                    label: 'TEST.API_TESTING.FIELDS.DONOR_AUTHORIZATION',
                    placeholder: 'TEST.API_TESTING.FIELDS.DONOR_AUTHORIZATION',
                    rules: 'string'
                },
                {
                    name: 'isRecurring',
                    label: 'Is Recurring',
                    placeholder: 'Is recurring',
                    rules: 'boolean',
                    type: 'checkbox',
                    value: false,
                    handlers: {
                        onChange: (field) => (event) => {
                            const value = event.target.checked;
                            let rule = 'numeric|min:1';
                            if (value) {
                                if (field.container().$('numberOfPayments').rules != 'numeric|min:1') {
                                    field.container().$('grantScheduleType').set('rules', 'required|string');
                                    field.container().$('startFutureDate').set('rules', `required|min_date:${moment().format('YYYY-MM-DD')}`);
                                }
                                else {
                                    rule += '|required';
                                    field.container().$('grantScheduleType').set('rules', 'required|string');
                                    field.container().$('startFutureDate').set('rules', `required|min_date:${moment().format('YYYY-MM-DD')}`);
                                    field.container().$('numberOfPayments').set('rules', 'numeric|min:1|required');
                                }

                            }
                            else {
                                field.container().$('grantScheduleType').set('rules', 'string');
                                field.container().$('startFutureDate').set('rules', '');
                                field.container().$('numberOfPayments').set('rules', 'numeric|min:1');
                            }

                            // field.container().$('numberOfPayments').set('rules', rule);
                            field.set(event.target.checked);
                        }
                    }
                },
                {
                    name: 'cardNumber',
                    label: 'TEST.API_TESTING.FIELDS.CARDNUMBER',
                    placeholder: 'TEST.API_TESTING.FIELDS.CARDNUMBER',
                    rules: 'string'
                },
                {
                    name: 'description',
                    label: 'TEST.API_TESTING.FIELDS.DESCRIPTION',
                    placeholder: 'TEST.API_TESTING.FIELDS.DESCRIPTION',
                    rules: 'string'
                },
                {
                    name: 'purposeNote',
                    label: 'TEST.API_TESTING.FIELDS.PURPOSE_NOTE',
                    placeholder: 'TEST.API_TESTING.FIELDS.PURPOSE_NOTE',
                    rules: 'string'
                },
            ]
        };
    }
}