import { FormBase } from 'core/components';
import { localizationService } from 'core/services'
import moment from 'moment';

export default class GrantDonorAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);

    }

    setup() {
        return {
            fields: [
                {
                    name: 'grant',
                    fields: [
                        {
                            name: 'charityId',
                            label: localizationService.t('GRANTCREATEEDITFORM.GRANT.CHARITYID'),
                            rules: 'required|string'
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
                            name: 'grantPurposeMemberName',
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
                        }
                    ]
                },
                {
                    name: 'amount',
                    label: localizationService.t('GRANTCREATEEDITFORM.AMOUNT'),
                    options: {
                        validateOnChange: true
                    }
                }
            ]
        }
    }
};