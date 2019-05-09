import moment from 'moment';

function ContributionCreateFormFields(achId, checkId, chaseQuickPayId, stockAndMutualFundsId, lowBalanceAmountId, oneTimeId, everyTwoWeeksId, everyTwoMonthsId, everySixMonthsId, weeklyId, monthlyId, minimumAmount, donorAccount) {
    return [
        {
            name: 'donorAccountId',
            rules: 'required|string',
            value: donorAccount.id
        },
        {
            name: 'amount',
            label: 'CONTRIBUTIONCREATEFORM.AMOUNT',
            rules: `required|numeric|min:${minimumAmount}`
        },
        {
            name: 'description',
            label: 'CONTRIBUTIONCREATEFORM.DESCRIPTION',
            rules: 'string',
        },
        {
            name: 'paymentTypeId',
            label: 'CONTRIBUTIONCREATEFORM.PAYMENTTYPEID',
            rules: 'required|string',
        },
        {
            name: 'bankAccountId',
            label: 'CONTRIBUTIONCREATEFORM.BANKACCOUNTID',
            rules: `required_if:paymentTypeId,${achId}|string`,
        },
        {
            name: 'checkNumber',
            label: 'CONTRIBUTIONCREATEFORM.CHECKNUMBER',
            rules: `required_if:paymentTypeId,${checkId}|string`,
        },
        {
            name: 'payerInformation',
            label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION',
            fields: [
                {
                    name: 'firstName',
                    label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.FIRSTNAME',
                    rules: 'required|string',
                    value: donorAccount.coreUser.firstName
                },
                {
                    name: 'lastName',
                    label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.LASTNAME',
                    rules: 'required|string',
                    value: donorAccount.coreUser.lastName
                },
                {
                    name: 'address',
                    label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS',
                    fields: [
                        {
                            name: 'addressLine1',
                            label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE1',
                            rules: 'required|string',
                            value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.addressLine1
                        },
                        {
                            name: 'addressLine2',
                            label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE2',
                            rules: 'string',
                            value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.addressLine2
                        },
                        {
                            name: 'city',
                            label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.CITY',
                            rules: 'required|string',
                            value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.city
                        },
                        {
                            name: 'state',
                            label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.STATE',
                            rules: 'required|string',
                            value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.state
                        },
                        {
                            name: 'zipCode',
                            label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.ZIPCODE',
                            rules: 'required|string',
                            value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.zipCode
                        },
                    ]
                },
                {
                    name: 'emailAddress',
                    label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.EMAILADDRESS',
                    fields: [
                        {
                            name: 'email',
                            label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.EMAILADDRESS.EMAIL',
                            rules: 'required|string',
                            value: _.find(donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress.email
                        },
                    ]
                },
                {
                    name: 'phoneNumber',
                    label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.PHONENUMBER',
                    fields: [
                        {
                            name: 'number',
                            label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.PHONENUMBER.NUMBER',
                            rules: 'required|string',
                            value: _.find(donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber.number
                        },
                    ]
                },
            ]
        },
        {
            name: 'financialInstitution',
            label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTION',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
        },
        {
            name: 'financialInstitutionAddressLine1',
            label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONADDRESSLINE1',
            rules: `required_with:financialInstitutionAddressLine2|required_with:financialInstitutionCity|required_with:financialInstitutionState|required_with:financialInstitutionZipCode|string`,
            related: ['financialInstitutionAddressLine2', 'financialInstitutionCity', 'financialInstitutionState', 'financialInstitutionZipCode'],
        },
        {
            name: 'financialInstitutionAddressLine2',
            label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONADDRESSLINE2',
            rules: 'string'
        },
        {
            name: 'financialInstitutionCity',
            label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONCITY',
            rules: `required_with:financialInstitutionAddressLine1|required_with:financialInstitutionAddressLine2|required_with:financialInstitutionState|required_with:financialInstitutionZipCode|string`,
            related: ['financialInstitutionAddressLine1', 'financialInstitutionAddressLine2', 'financialInstitutionState', 'financialInstitutionZipCode'],
        },
        {
            name: 'financialInstitutionState',
            label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONSTATE',
            rules: `required_with:financialInstitutionAddressLine1|required_with:financialInstitutionAddressLine2|required_with:financialInstitutionCity|required_with:financialInstitutionZipCode|string`,
            related: ['financialInstitutionAddressLine1', 'financialInstitutionAddressLine2', 'financialInstitutionCity', 'financialInstitutionZipCode'],
        },
        {
            name: 'financialInstitutionZipCode',
            label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONZIPCODE',
            rules: `required_with:financialInstitutionAddressLine1|required_with:financialInstitutionAddressLine2|required_with:financialInstitutionCity|required_with:financialInstitutionState|string`,
            related: ['financialInstitutionAddressLine1', 'financialInstitutionAddressLine2', 'financialInstitutionCity', 'financialInstitutionState'],
        },
        {
            name: 'financialInstitutionPhoneNumber',
            label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONPHONENUMBER',
            rules: `string`
        },
        {
            name: 'accountNumber',
            label: 'CONTRIBUTIONCREATEFORM.ACCOUNTNUMBER',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`
        },
        {
            name: 'securityType',
            label: 'CONTRIBUTIONCREATEFORM.SECURITYTYPE',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`
        },
        {
            name: 'securitySymbol',
            label: 'CONTRIBUTIONCREATEFORM.SECURITYSYMBOL',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`
        },
        {
            name: 'numberOfShares',
            label: 'CONTRIBUTIONCREATEFORM.NUMBEROFSHARES',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|numeric|min:0`
        },
        {
            name: 'estimatedValue',
            label: 'CONTRIBUTIONCREATEFORM.ESTIMATEDVALUE',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|numeric|min:10000`
        },
        {
            name: 'transactionId',
            label: 'CONTRIBUTIONCREATEFORM.TRANSACTIONID',
            rules: `required_if:paymentTypeId,${chaseQuickPayId}|string`
        },
        {
            name: 'memo',
            label: 'CONTRIBUTIONCREATEFORM.MEMO',
            rules: 'string'
        },
        {
            name: 'makeAsRecurringPayment',
            label: 'CONTRIBUTIONCREATEFORM.MAKEASRECURRINGPAYMENT',
            rules: 'boolean',
            value: false,
            type: 'checkbox'
        },
        {
            name: 'settingAmount',
            label: 'CONTRIBUTIONCREATEFORM.SETTINGAMOUNT',
            rules: 'required_if:makeAsRecurringPayment,true|string'
        },
        {
            name: 'settingBankAccountId',
            label: 'CONTRIBUTIONCREATEFORM.SETTINGBANKACCOUNTID',
            rules: 'required_if:makeAsRecurringPayment,true|string'
        },
        {
            name: 'contributionSettingTypeId',
            label: 'CONTRIBUTIONCREATEFORM.CONTRIBUTIONSETTINGTYPEID',
            rules: 'required_if:makeAsRecurringPayment,true|string'
        },
        {
            name: 'settingEnabled',
            label: 'CONTRIBUTIONCREATEFORM.SETTINGENABLED',
            rules: 'boolean',
            value: false,
            type: 'checkbox'
        },
        {
            name: 'settingStartDate',
            label: 'CONTRIBUTIONCREATEFORM.SETTINGSTARTDATE',
            rules: `required_if:contributionSettingTypeId,${oneTimeId}|required_if:contributionSettingTypeId,${weeklyId}|required_if:contributionSettingTypeId,${monthlyId}|required_if:contributionSettingTypeId,${everyTwoWeeksId}|required_if:contributionSettingTypeId,${everyTwoMonthsId}|required_if:contributionSettingTypeId,${everySixMonthsId}|date|after_override:' + ${moment(new Date).add(1, 'days').format('MM/DD/YYYY')}`
        },
        {
            name: 'settingLowBalanceAmount',
            label: 'CONTRIBUTIONCREATEFORM.SETTINGLOWBALANCEAMOUNT',
            rules: `required_if:contributionSettingTypeId,${lowBalanceAmountId}|string`
        }
    ]
}

export default ContributionCreateFormFields;