import moment from 'moment';
import { isSome } from 'core/utils';

function GrantUpdateFormFields(inMemoryOfId, inHonorOfId, sponsorAFriendId, minimumAmount, donorAccount, entity) {
    const withoutScheduleTypeAmountRule = `required|numeric|min:${minimumAmount}|max:${((donorAccount.availableBalance + donorAccount.lineOfCredit) / (1 + donorAccount.grantFee / 100)).toFixed(2)}`;

    return [
        {
            name: 'id',
            rules: 'required|string',
            value: entity.id
        },
        {
            name: 'charityId',
            label: 'GRANTCREATEFORM.CHARITYID',
            rules: 'required|string',
            value: entity.charityId
        },
        {
            name: 'amount',
            label: 'GRANTCREATEFORM.AMOUNT',
            rules: withoutScheduleTypeAmountRule,
            options: {
                validateOnChange: true
            },
            value: entity.amount
        },
        {
            name: 'description',
            label: 'GRANTCREATEFORM.DESCRIPTION',
            rules: 'string',
            value: entity.description
        },
        {
            name: 'grantPurposeTypeId',
            label: 'GRANTCREATEFORM.GRANTPURPOSETYPEID',
            rules: 'required|string',
            value: entity.grantPurposeTypeId
        },
        {
            name: 'grantAcknowledgmentTypeId',
            label: 'GRANTCREATEFORM.GRANTACKNOWLEDGMENTTYPEID',
            rules: 'required|string',
            value: entity.grantAcknowledgmentTypeId
        },
        {
            name: 'grantPurposeMember',
            label: 'GRANTCREATEFORM.GRANTPURPOSEMEMBER',
            fields: [
                {
                    name: 'firstName',
                    label: 'FIRSTNAME',
                    rules: `required_if:grantPurposeTypeId,${inMemoryOfId}|required_if:grantPurposeTypeId,${inHonorOfId}|required_if:grantPurposeTypeId,${sponsorAFriendId}|string`,
                    value: entity.grantPurposeMember ? entity.grantPurposeMember.firstName : ''
                },
                {
                    name: 'lastName',
                    label: 'LASTNAME',
                    rules: `required_if:grantPurposeTypeId,${inMemoryOfId}|required_if:grantPurposeTypeId,${inHonorOfId}|required_if:grantPurposeTypeId,${sponsorAFriendId}|string`,
                    value: entity.grantPurposeMember ? entity.grantPurposeMember.lastName : ''
                },
            ]
        },
        {
            name: 'charityEventAttending',
            label: 'GRANTCREATEFORM.CHARITYEVENTATTENDING',
            rules: 'boolean',
            type: 'checkbox',
            value: entity.charityEventAttending
        },
        {
            name: 'additionalInformation',
            label: 'GRANTCREATEFORM.ADDITIONALINFORMATION',
            rules: 'string',
            value: entity.additionalInformation
        }
    ]
}

export default GrantUpdateFormFields;