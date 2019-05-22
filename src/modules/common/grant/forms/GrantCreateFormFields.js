import moment from 'moment';

function GrantCreateFormFields(inMemoryOfId, inHonorOfId, sponsorAFriendId, otherId, minimumAmount, donorAccount) {
    return [
        {
            name: 'charityId',
            label: 'GRANTCREATEFORM.CHARITYID',
            rules: 'required|string'
        },
        {
            name: 'donorAccountId',
            rules: 'required|string',
            value: donorAccount.id
        },
        {
            name: 'amount',
            label: 'GRANTCREATEFORM.AMOUNT',
            rules: `required|numeric|min:${minimumAmount}|max:${donorAccount.availableBalance}`
        },
        {
            name: 'description',
            label: 'GRANTCREATEFORM.DESCRIPTION',
            rules: 'string',
        },
        {
            name: 'grantPurposeTypeId',
            label: 'GRANTCREATEFORM.GRANTPURPOSETYPEID',
            rules: 'required|string'
        },
        {
            name: 'grantAcknowledgmentTypeId',
            label: 'GRANTCREATEFORM.GRANTACKNOWLEDGMENTTYPEID',
            rules: 'required|string'
        },
        {
            name: 'grantPurposeMember',
            label: 'GRANTCREATEFORM.GRANTPURPOSEMEMBER',
            fields: [
                {
                    name: 'firstName',
                    label: 'FIRSTNAME',
                    rules: `required_if:grantPurposeTypeId,${inMemoryOfId}|required_if:grantPurposeTypeId,${inHonorOfId}|required_if:grantPurposeTypeId,${sponsorAFriendId}|string`
                },
                {
                    name: 'lastName',
                    label: 'LASTNAME',
                    rules: `required_if:grantPurposeTypeId,${inMemoryOfId}|required_if:grantPurposeTypeId,${inHonorOfId}|required_if:grantPurposeTypeId,${sponsorAFriendId}|string`
                },
            ]
        },
        {
            name: 'charityEventAttending',
            label: 'GRANTCREATEFORM.CHARITYEVENTATTENDING',
            rules: 'boolean',
            type: 'checkbox'
        },
        {
            name: 'additionalInformation',
            label: 'GRANTCREATEFORM.ADDITIONALINFORMATION',
            rules: `string`
        },
        {
            name: 'recurringOrFuture',
            label: 'GRANTCREATEFORM.RECURRINGORFUTURE',
            rules: 'boolean',
            type: 'checkbox',
            value: false
        },
        {
            name: 'grantTypeId',
            label: 'GRANTCREATEFORM.GRANTTYPEID',
            rules: 'string'
        },
        {
            name: 'futureDate',
            label: 'GRANTCREATEFORM.FUTUREDATE',
            rules: 'string'
        },
        {
            name: 'startDate',
            label: 'GRANTCREATEFORM.STARTDATE',
            rules: 'string'
        },
        {
            name: 'endDate',
            label: 'GRANTCREATEFORM.ENDDATE',
            rules: 'string'
        },
        {
            name: 'duration',
            label: 'GRANTCREATEFORM.duration',
            rules: 'numeric'
        },
        {
            name: 'ongoing',
            label: 'GRANTCREATEFORM.ENDDATE',
            rules: 'boolean',
            type: 'checkbox'
        }
    ]
}

export default GrantCreateFormFields;