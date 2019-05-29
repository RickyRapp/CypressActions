import { isSome } from 'core/utils'
import { localizationService } from 'core/services'
import _ from 'lodash'

function GrantReviewPut(checkId, achId, grant) {
    const primaryAddress = _.find(grant.charity.charityAddresses, { primary: true }).address;

    return [
        {
            name: 'id',
            rules: 'required|string',
            value: grant.id
        },
        {
            name: 'charityId',
            label: localizationService.t('GRANTREVIEWFORM.CHARITYID'),
            rules: 'required|string',
            value: grant.charity.id
        },
        {
            name: 'donorAccountId',
            rules: 'required|string',
            value: grant.donorAccount.id
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
            label: localizationService.t('GRANTREVIEWFORM.BANKACCOUNTID'),
            rules: `required_if:paymentTypeId,${achId}|string`,
            value: isSome(grant.charity.bankAccount) ? grant.charity.bankAccount.id : ''
        },
        {
            name: 'paymentNumber',
            label: localizationService.t('GRANTREVIEWFORM.PAYMENTNUMBER'),
            rules: `required|string`,
        },
        {
            name: 'attOf',
            label: localizationService.t('GRANTREVIEWFORM.ATTOF'),
            rules: `required_if:paymentTypeId,${checkId}|string`,
        },
        {
            name: 'recipientAddress',
            label: localizationService.t('GRANTREVIEWFORM.RECIPIENTADDRESS'),
            fields: [
                {
                    name: 'addressLine1',
                    label: localizationService.t('ADDRESS.ADDRESSLINE1'),
                    rules: `required_if:paymentTypeId,${checkId}|string`,
                    value: primaryAddress.addressLine1
                },
                {
                    name: 'addressLine2',
                    label: localizationService.t('ADDRESS.ADDRESSLINE2'),
                    rules: 'string',
                    value: primaryAddress.addressLine2
                },
                {
                    name: 'city',
                    label: localizationService.t('ADDRESS.CITY'),
                    rules: `required_if:paymentTypeId,${checkId}|string`,
                    value: primaryAddress.city
                },
                {
                    name: 'state',
                    label: localizationService.t('ADDRESS.STATE'),
                    rules: `required_if:paymentTypeId,${checkId}|string`,
                    value: primaryAddress.state
                },
                {
                    name: 'zipCode',
                    label: localizationService.t('ADDRESS.ZIPCODE'),
                    rules: `required_if:paymentTypeId,${checkId}|string`,
                    value: primaryAddress.zipCode
                },
                {
                    name: 'description',
                    label: localizationService.t('ADDRESS.DESCRIPTION'),
                    rules: 'string',
                },
            ]
        }
    ]
}

export default GrantReviewPut;