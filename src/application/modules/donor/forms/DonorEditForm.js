import { FormBase } from 'core/components';
import { donorSettingsFormProperties } from 'application/donor/forms';

export default class DonorEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'firstName',
                    label: 'DONOR.EDIT.FIRST_NAME_LABEL',
                    placeholder: 'DONOR.EDIT.FIRST_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'lastName',
                    label: 'DONOR.EDIT.LAST_NAME_LABEL',
                    placeholder: 'DONOR.EDIT.LAST_NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'middleName',
                    label: 'DONOR.EDIT.MIDDLE_NAME_LABEL',
                    placeholder: 'DONOR.EDIT.MIDDLE_NAME_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'fundName',
                    label: 'DONOR.EDIT.FUND_NAME_LABEL',
                    placeholder: 'DONOR.EDIT.FUND_NAME_PLACEHOLDER',
                    rules: ['required', 'string', `regex:^The[\\-\\'\\s\\w]+Fund$`]
                },
                {
                    name: 'prefixTypeId',
                    label: 'DONOR.EDIT.PREFIX_TYPE_LABEL',
                    placeholder: 'DONOR.EDIT.PREFIX_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'securityPin',
                    label: 'DONOR.EDIT.SECURITY_PIN_LABEL',
                    rules: 'required|string|digits:4',
                    extra: {
                        format: '####',
                        mask: '*'
                    }
                }
            ]
        };
    }
}
