import moment from 'moment';

function GrantCreateFormFields(inMemoryOfId, inHonorOfId, sponsorAFriendId, oneTimeId, monthlyId, annualId, minimumAmount, donorAccount) {
    const scheduleTypeAmountRule = `required|numeric|min:${minimumAmount}`;
    const withoutScheduleTypeAmountRule = `required|numeric|min:${minimumAmount}|max:${((donorAccount.availableBalance + donorAccount.lineOfCredit) / (1 + donorAccount.grantFee / 100)).toFixed(2)}`;

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
            rules: withoutScheduleTypeAmountRule,
            options: {
                validateOnChange: true
            }
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
            value: false,
            observers: [{
                key: 'value', // can be any prop
                call: ({ form, field }) => {
                    if (field.value === true) {
                        form.$('amount').set('rules', scheduleTypeAmountRule)
                    }
                    else {
                        form.$('amount').set('rules', withoutScheduleTypeAmountRule)
                    }
                },
            }],
        },
        {
            name: 'grantScheduleTypeId',
            label: 'GRANTCREATEFORM.GRANTSCHEDULETYPEID',
            rules: 'required_if:recurringOrFuture,true|string'
        },
        {
            name: 'name',
            label: 'GRANTCREATEFORM.GRANTSCHEDULEDNAME',
            rules: `string`
        },
        {
            name: 'futureDate',
            label: 'GRANTCREATEFORM.FUTUREDATE',
            rules: `required_if:grantScheduleTypeId,${oneTimeId}|date`
        },
        {
            name: 'startDate',
            label: 'GRANTCREATEFORM.STARTDATE',
            rules: `required_if:grantScheduleTypeId,${monthlyId}|required_if:grantScheduleTypeId,${annualId}|date`
        },
        {
            name: 'endDate',
            label: 'GRANTCREATEFORM.ENDDATE',
            rules: 'date',
            observers: [{
                key: 'value', // can be any prop
                call: ({ form, field }) => {
                    form.$('numberOfPayments').set('disabled', field.value);
                    form.$('noEndDate').set('disabled', field.value);
                    form.$('numberOfPayments').set('value', '');
                    form.$('noEndDate').set('value', '');
                },
            }],
        },
        {
            name: 'numberOfPayments',
            label: 'GRANTCREATEFORM.NUMBEROFPAYMENTS',
            rules: 'numeric',
            observers: [{
                key: 'value', // can be any prop
                call: ({ form, field }) => {
                    form.$('endDate').set('disabled', field.value);
                    form.$('noEndDate').set('disabled', field.value);
                    form.$('endDate').set('value', '');
                    form.$('noEndDate').set('value', '');
                },
            }],
        },
        {
            name: 'noEndDate',
            label: 'GRANTCREATEFORM.NOENDDATE',
            rules: 'boolean',
            type: 'checkbox',
            observers: [{
                key: 'value', // can be any prop
                call: ({ form, field }) => {
                    form.$('endDate').set('disabled', field.value);
                    form.$('numberOfPayments').set('disabled', field.value);
                    form.$('endDate').set('value', '');
                    form.$('numberOfPayments').set('value', '');
                },
            }],
        }
    ]
}

export default GrantCreateFormFields;