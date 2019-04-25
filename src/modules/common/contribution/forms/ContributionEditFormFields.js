function ContributionEditFormFields(contribution, achId, checkId, chaseQuickPayId, stockAndMutualFundsId, minimumAmount, donorAccount) {
    return [
        {
            name: 'id',
            rules: 'required|string',
            value: contribution.id
        },
        {
            name: 'donorAccountId',
            rules: 'required|string',
            value: contribution.donorAccountId
        },
        {
            name: 'amount',
            label: 'CONTRIBUTIONEDITFORM.AMOUNT',
            rules: `required|numeric|min:${minimumAmount}`,
            value: contribution.amount
        },
        {
            name: 'description',
            label: 'CONTRIBUTIONEDITFORM.DESCRIPTION',
            rules: 'string',
            value: contribution.description
        },
        {
            name: 'paymentTypeId',
            label: 'CONTRIBUTIONEDITFORM.PAYMENTTYPEID',
            rules: 'required|string',
            value: contribution.paymentTypeId
        },
        {
            name: 'bankAccountId',
            label: 'CONTRIBUTIONEDITFORM.BANKACCOUNTID',
            rules: `required_if:paymentTypeId,${achId}|string`,
            value: contribution.bankAccountId
        },
        {
            name: 'checkNumber',
            label: 'CONTRIBUTIONEDITFORM.CHECKNUMBER',
            rules: `required_if:paymentTypeId,${checkId}|string`,
            value: contribution.checkNumber
        },
        {
            name: 'payerInformation',
            label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION',
            fields: [
                {
                    name: 'firstName',
                    label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.FIRSTNAME',
                    rules: 'required|string',
                    value: contribution.payerInformation.firstName,
                    defaultValue: donorAccount.coreUser.firstName
                },
                {
                    name: 'lastName',
                    label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.LASTNAME',
                    rules: 'required|string',
                    value: contribution.payerInformation.lastName,
                    defaultValue: donorAccount.coreUser.lastName
                },
                {
                    name: 'address',
                    label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS',
                    fields: [
                        {
                            name: 'addressLine1',
                            label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE1',
                            rules: 'required|string',
                            value: contribution.payerInformation.address.addressLine1,
                            defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.addressLine1
                        },
                        {
                            name: 'addressLine2',
                            label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE2',
                            rules: 'string',
                            value: contribution.payerInformation.address.addressLine2,
                            defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.addressLine2
                        },
                        {
                            name: 'city',
                            label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.CITY',
                            rules: 'required|string',
                            value: contribution.payerInformation.address.city,
                            defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.city
                        },
                        {
                            name: 'state',
                            label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.STATE',
                            rules: 'required|string',
                            value: contribution.payerInformation.address.state,
                            defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.state
                        },
                        {
                            name: 'zipCode',
                            label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.ZIPCODE',
                            rules: 'required|string',
                            value: contribution.payerInformation.address.zipCode,
                            defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.zipCode
                        },
                    ]
                },
                {
                    name: 'emailAddress',
                    label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.EMAILADDRESS',
                    fields: [
                        {
                            name: 'email',
                            label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.EMAILADDRESS.EMAIL',
                            rules: 'required|string',
                            value: contribution.payerInformation.emailAddress.email,
                            defaultValue: _.find(donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress.email
                        },
                    ]
                },
                {
                    name: 'phoneNumber',
                    label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.PHONENUMBER',
                    fields: [
                        {
                            name: 'number',
                            label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.PHONENUMBER.NUMBER',
                            rules: 'required|string',
                            value: contribution.payerInformation.phoneNumber.number,
                            defaultValue: _.find(donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber.number
                        },
                    ]
                },
            ]
        },
        {
            name: 'financialInstitution',
            label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTION',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
            value: contribution.financialInstitution
        },
        {
            name: 'financialInstitutionAddressLine1',
            label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONADDRESSLINE1',
            rules: `string`,
            value: contribution.financialInstitutionAddressLine1
        },
        {
            name: 'financialInstitutionAddressLine2',
            label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONADDRESSLINE2',
            rules: 'string',
            value: contribution.financialInstitutionAddressLine2
        },
        {
            name: 'financialInstitutionCity',
            label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONCITY',
            rules: `string`,
            value: contribution.financialInstitutionCity
        },
        {
            name: 'financialInstitutionState',
            label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONSTATE',
            rules: `string`,
            value: contribution.financialInstitutionState
        },
        {
            name: 'financialInstitutionZipCode',
            label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONZIPCODE',
            rules: `string`,
            value: contribution.financialInstitutionZipCode
        },
        {
            name: 'financialInstitutionPhoneNumber',
            label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONPHONENUMBER',
            rules: `string`,
            value: contribution.financialInstitutionPhoneNumber
        },
        {
            name: 'accountNumber',
            label: 'CONTRIBUTIONEDITFORM.ACCOUNTNUMBER',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
            value: contribution.accountNumber
        },
        {
            name: 'securityType',
            label: 'CONTRIBUTIONEDITFORM.SECURITYTYPE',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
            value: contribution.securityType
        },
        {
            name: 'securitySymbol',
            label: 'CONTRIBUTIONEDITFORM.SECURITYSYMBOL',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
            value: contribution.securitySymbol
        },
        {
            name: 'numberOfShares',
            label: 'CONTRIBUTIONEDITFORM.NUMBEROFSHARES',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|numeric|min:0`,
            value: contribution.numberOfShares
        },
        {
            name: 'estimatedValue',
            label: 'CONTRIBUTIONEDITFORM.ESTIMATEDVALUE',
            rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|numeric|min:10000`,
            value: contribution.estimatedValue
        },
        {
            name: 'transactionId',
            label: 'CONTRIBUTIONEDITFORM.TRANSACTIONID',
            rules: `required_if:paymentTypeId,${chaseQuickPayId}|string`,
            value: contribution.transactionId
        },
        {
            name: 'memo',
            label: 'CONTRIBUTIONEDITFORM.MEMO',
            rules: 'string',
            value: contribution.memo
        }

    ]
}

export default ContributionEditFormFields;