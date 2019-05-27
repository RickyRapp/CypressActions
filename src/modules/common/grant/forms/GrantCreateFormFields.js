import moment from 'moment';
import { isSome } from 'core/utils';

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
            name: 'firstName',
            label: 'FIRSTNAME',
            rules: `required_if:grantPurposeTypeId,${inMemoryOfId}|required_if:grantPurposeTypeId,${inHonorOfId}|required_if:grantPurposeTypeId,${sponsorAFriendId}|string`
        },
        {
            name: 'lastName',
            label: 'LASTNAME',
            rules: `required_if:grantPurposeTypeId,${inMemoryOfId}|required_if:grantPurposeTypeId,${inHonorOfId}|required_if:grantPurposeTypeId,${sponsorAFriendId}|string`
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
            name: 'startFutureDate',
            label: 'GRANTCREATEFORM.STARTDATE',
            rules: `required_if:grantScheduleTypeId,${monthlyId}|required_if:grantScheduleTypeId,${annualId}|date|after:${moment().format('MM/DD/YYYY')}`,
            options: {
                validateOnChange: true
            }
        },
        {
            name: 'endDate',
            label: 'GRANTCREATEFORM.ENDDATE',
            rules: `date|after:${moment().format('MM/DD/YYYY')}`,
            options: {
                validateOnChange: true
            }
        },
        {
            name: 'numberOfPayments',
            label: 'GRANTCREATEFORM.NUMBEROFPAYMENTS',
            rules: 'numeric'
        },
        {
            name: 'noEndDate',
            label: 'GRANTCREATEFORM.NOENDDATE',
            rules: 'boolean',
            type: 'checkbox'
        }
    ]
}

export default GrantCreateFormFields;