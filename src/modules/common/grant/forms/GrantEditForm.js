import { FormBase } from 'core/components';
import { localizationService } from 'core/services'
import moment from 'moment';

export default class GrantEditForm extends FormBase {
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
                    label: localizationService.t('GRANTCREATEEDITFORM.GRANTPURPOSEMEMBER'),
                    fields: [
                        {
                            name: 'firstName',
                            label: localizationService.t('FIRSTNAME'),
                            rules: 'string'
                        },
                        {
                            name: 'lastName',
                            label: localizationService.t('LASTNAME'),
                            rules: 'string'
                        },
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
                }
            ]
        }
    }
};