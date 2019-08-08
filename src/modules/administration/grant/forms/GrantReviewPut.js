import { isSome } from 'core/utils'
import { localizationService } from 'core/services'
import { FormBase } from 'core/components';
import _ from 'lodash'

export default class GrantReviewForm extends FormBase {
    constructor(hooks) {
        super(hooks);

    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    rules: 'required|string'
                },
                {
                    name: 'charityId',
                    label: localizationService.t('GRANTREVIEWFORM.CHARITYID'),
                    rules: 'required|string'
                },
                {
                    name: 'description',
                    label: localizationService.t('GRANTREVIEWFORM.DESCRIPTION'),
                    rules: 'string',
                },
                {
                    name: 'paymentTypeId',
                    label: localizationService.t('GRANTREVIEWFORM.PAYMENTTYPEID'),
                    rules: 'required|string',
                    options: {
                        validateOnChange: true
                    }
                },
                {
                    name: 'bankAccountId',
                    label: localizationService.t('GRANTREVIEWFORM.BANKACCOUNTID')
                },
                {
                    name: 'paymentNumber',
                    label: localizationService.t('GRANTREVIEWFORM.PAYMENTNUMBER'),
                    rules: `required|string`,
                },
                {
                    name: 'attOf',
                    label: localizationService.t('GRANTREVIEWFORM.ATTOF')
                },
                {
                    name: 'recipientAddress',
                    label: localizationService.t('GRANTREVIEWFORM.RECIPIENTADDRESS'),
                    fields: [
                        {
                            name: 'addressLine1',
                            label: localizationService.t('ADDRESS.ADDRESSLINE1')
                        },
                        {
                            name: 'addressLine2',
                            label: localizationService.t('ADDRESS.ADDRESSLINE2'),
                            rules: 'string',
                        },
                        {
                            name: 'city',
                            label: localizationService.t('ADDRESS.CITY')
                        },
                        {
                            name: 'state',
                            label: localizationService.t('ADDRESS.STATE')
                        },
                        {
                            name: 'zipCode',
                            label: localizationService.t('ADDRESS.ZIPCODE')
                        }
                    ]
                }
            ]
        }
    }
};