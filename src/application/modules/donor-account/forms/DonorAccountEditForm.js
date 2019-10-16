import { FormBase } from 'core/components';
import { donorAccountSettingsFormProperties } from 'application/donor-account/forms';

export default class DonorAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'firstName',
                    label: 'DONOR_ACCOUNT.EDIT.FIRST_NAME_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'lastName',
                    label: 'DONOR_ACCOUNT.EDIT.LAST_NAME_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'middleName',
                    label: 'DONOR_ACCOUNT.EDIT.MIDDLE_NAME_LABEL',
                    rules: 'string'
                },
                {
                    name: 'fundName',
                    label: 'DONOR_ACCOUNT.EDIT.FUND_NAME_LABEL',
                    rules: ['required', 'string', `regex:^The[\\-\\'\\s\\w]+Fund$`]
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: 'DONOR_ACCOUNT.EDIT.DELIVERY_METHOD_TYPE_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'blankBookletMax',
                    label: 'DONOR_ACCOUNT.EDIT.BLANK_BOOKLET_MAX_LABEL',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'DONOR_ACCOUNT.EDIT.LOW_BALANCE_REMAINDER_LABEL',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'prefixTypeId',
                    label: 'DONOR_ACCOUNT.EDIT.PREFIX_TYPE_LABEL',
                    rules: 'string'
                },
                ...donorAccountSettingsFormProperties.fields
            ]
        };
    }
}
