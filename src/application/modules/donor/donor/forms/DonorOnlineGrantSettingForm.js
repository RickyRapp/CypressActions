import { FormBase } from 'core/components';

export default class DonorOnlineGrantSettingForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isMicroGivingEnabled',
                    label: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_LABEL',
                    placeholder: 'DONOR.CHARITY_WEBSITE_SETTING.EDIT.FIELDS.IS_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}