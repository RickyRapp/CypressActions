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
                    placeholder: 'DONOR_ACCOUNT.EDIT.FIRST_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'lastName',
                    label: 'DONOR_ACCOUNT.EDIT.LAST_NAME_LABEL',
                    placeholder: 'DONOR_ACCOUNT.EDIT.LAST_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'middleName',
                    label: 'DONOR_ACCOUNT.EDIT.MIDDLE_NAME_LABEL',
                    placeholder: 'DONOR_ACCOUNT.EDIT.MIDDLE_NAME_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'fundName',
                    label: 'DONOR_ACCOUNT.EDIT.FUND_NAME_LABEL',
                    placeholder: 'DONOR_ACCOUNT.EDIT.FUND_NAME_PLACEHOLDER',
                    rules: ['required', 'string', `regex:^The[\\-\\'\\s\\w]+Fund$`]
                },
                {
                    name: 'blankBookletMaxAmount',
                    label: 'DONOR_ACCOUNT.EDIT.BLANK_BOOKLET_MAX_LABEL',
                    placeholder: 'DONOR_ACCOUNT.EDIT.BLANK_BOOKLET_MAX_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'DONOR_ACCOUNT.EDIT.LOW_BALANCE_REMAINDER_LABEL',
                    placeholder: 'DONOR_ACCOUNT.EDIT.LOW_BALANCE_REMAINDER_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'prefixTypeId',
                    label: 'DONOR_ACCOUNT.EDIT.PREFIX_TYPE_LABEL',
                    placeholder: 'DONOR_ACCOUNT.EDIT.PREFIX_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                ...donorAccountSettingsFormProperties.fields
            ]
        };
    }
}
