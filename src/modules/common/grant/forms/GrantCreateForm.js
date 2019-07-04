import { FormBase } from 'core/components';
import { localizationService } from 'core/services'
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
                    label: localizationService.t('GRANTCREATEEDITFORM.CHARITYID'),
                    rules: 'required|string'
                },
                {
                    name: 'donorAccountId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: localizationService.t('GRANTCREATEEDITFORM.AMOUNT'),
                    options: {
                        validateOnChange: true
                    }
                },
                {
                    name: 'description',
                    label: localizationService.t('GRANTCREATEEDITFORM.DESCRIPTION'),
                    rules: 'string',
                },
                {
                    name: 'grantPurposeTypeId',
                    label: localizationService.t('GRANTCREATEEDITFORM.GRANTPURPOSETYPEID'),
                    rules: 'required|string'
                },
                {
                    name: 'grantAcknowledgmentTypeId',
                    label: localizationService.t('GRANTCREATEEDITFORM.GRANTACKNOWLEDGMENTTYPEID'),
                    rules: 'required|string'
                },
                {
                    name: 'grantPurposeMember',
                    fields: [
                        {
                            name: 'name',
                            label: localizationService.t('GRANTCREATEEDITFORM.GRANTPURPOSEMEMBER.NAME'),
                            rules: 'string'
                        }
                    ]
                },
                {
                    name: 'charityEventAttending',
                    label: localizationService.t('GRANTCREATEEDITFORM.CHARITYEVENTATTENDING'),
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'additionalInformation',
                    label: localizationService.t('GRANTCREATEEDITFORM.ADDITIONALINFORMATION'),
                    rules: `string`
                },
                {
                    name: 'grantScheduleTypeId',
                    label: localizationService.t('GRANTCREATEEDITFORM.GRANTSCHEDULETYPEID'),
                    rules: 'required|string'
                },
                {
                    name: 'name',
                    label: localizationService.t('GRANTCREATEEDITFORM.GRANTSCHEDULEDNAME'),
                    rules: 'string'
                },
                {
                    name: 'startFutureDate',
                    label: localizationService.t('GRANTCREATEEDITFORM.STARTDATE'),
                    rules: `date|after_or_equal:${moment().format('MM/DD/YYYY')}`,
                    options: {
                        validateOnChange: true
                    },
                    related: ['amount']
                },
                {
                    name: 'endDate',
                    label: localizationService.t('GRANTCREATEEDITFORM.ENDDATE'),
                    rules: `date|after:${moment().format('MM/DD/YYYY')}`,
                    options: {
                        validateOnChange: true
                    }
                },
                {
                    name: 'numberOfPayments',
                    label: localizationService.t('GRANTCREATEEDITFORM.NUMBEROFPAYMENTS'),
                    rules: 'numeric'
                },
                {
                    name: 'noEndDate',
                    label: localizationService.t('GRANTCREATEEDITFORM.NOENDDATE'),
                    rules: 'boolean',
                    type: 'checkbox'
                }
            ]
        }
    }
};