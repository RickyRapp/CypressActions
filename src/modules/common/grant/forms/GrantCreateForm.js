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
                    name: 'donation',
                    fields: [
                        {
                            name: 'charityId',
                            label: localizationService.t('GRANTCREATEEDITFORM.GRANT.CHARITYID'),
                            rules: 'required|string'
                        }
                    ]
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
                    name: 'purposeMemberName',
                    label: localizationService.t('GRANTCREATEEDITFORM.GRANTPURPOSEMEMBERNAME'),
                    rules: 'string'
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
                    name: 'description',
                    label: localizationService.t('GRANTCREATEEDITFORM.DESCRIPTION'),
                    rules: 'string',
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
                    }
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