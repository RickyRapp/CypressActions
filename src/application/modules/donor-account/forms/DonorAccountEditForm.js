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
                    label: 'DONORACCOUNT.EDIT.FIRST_NAME_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'lastName',
                    label: 'DONORACCOUNT.EDIT.LAST_NAME_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'middleName',
                    label: 'DONORACCOUNT.EDIT.MIDDLE_NAME_LABEL',
                    rules: 'string'
                },
                {
                    name: 'fundName',
                    label: 'DONORACCOUNT.EDIT.FUND_NAME_LABEL',
                    rules: ['required', 'string', `regex:^The[\\-\\'\\s\\w]+Fund$`]
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: 'DONORACCOUNT.EDIT.DELIVERY_METHOD_TYPE_LABEL',
                    rules: 'required|string'
                },
                {
                    name: 'blankBookletMax',
                    label: 'DONORACCOUNT.EDIT.BLANK_BOOKLET_MAX_LABEL',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'DONORACCOUNT.EDIT.LOW_BALANCE_REMAINDER_LABEL',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'prefixTypeId',
                    label: 'DONORACCOUNT.EDIT.PREFIX_TYPE_LABEL',
                    rules: 'string'
                },
                ...donorAccountSettingsFormProperties.fields
            ]
        };
    }
}
