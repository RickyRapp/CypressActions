import { FormBase } from 'core/components';

export default class DonorOnlineGrantSettingForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'grantAcknowledgmentTypeId',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'grantPurposeTypeId',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.GRANT_PURPOSE_TYPE_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.GRANT_PURPOSE_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'maxAmount',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.MAX_AMOUNT_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.MAX_AMOUNT_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'maxTimesPerDay',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.MAX_TIMES_PER_DAY_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.MAX_TIMES_PER_DAY_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'n0'
                    }
                },
                {
                    name: 'isEnabled',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}