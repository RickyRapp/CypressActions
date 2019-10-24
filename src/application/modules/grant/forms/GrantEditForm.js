import { FormBase } from 'core/components';

export default class GrantEditForm extends FormBase {
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
                    name: 'donorAccountId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: 'GRANT.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'grantPurposeTypeId',
                    label: 'GRANT.CREATE.FIELDS.GRANT_PURPOSE_TYPE_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.GRANT_PURPOSE_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'grantAcknowledgmentTypeId',
                    label: 'GRANT.CREATE.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'charity',
                    label: 'GRANT.CREATE.FIELDS.CHARITY_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.CHARITY_PLACEHOLDER',
                    rules: 'required'
                },
                {
                    name: 'additionalInformation',
                    label: 'GRANT.CREATE.FIELDS.ADDITIONAL_INFORMATION_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.ADDITIONAL_INFORMATION_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'purposeMemberName',
                    label: 'GRANT.CREATE.FIELDS.PURPOSE_MEMBER_NAME_LABEL',
                    placeholder: 'GRANT.CREATE.FIELDS.PURPOSE_MEMBER_NAME_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityEventAttending',
                    label: 'GRANT.CREATE.FIELDS.CHARITY_EVENT_LABEL',
                    rules: 'boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}