import { FormBase } from 'core/components';

export default class DonorGivingCardSettingForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'grantAcknowledgmentTypeId',
                    label: 'DONOR_GIVING_CARD_SETTING.EDIT.FIELDS.GRANT_ACKNOWLEDGMENT_TYPE_LABEL',
                    rules: 'string'
                },
                {
                    name: 'grantPurposeTypeId',
                    label: 'DONOR_GIVING_CARD_SETTING.EDIT.FIELDS.GRANT_PURPOSE_TYPE_LABEL',
                    rules: 'string'
                },
                {
                    name: 'maxAmount',
                    label: 'DONOR_GIVING_CARD_SETTING.EDIT.FIELDS.MAX_AMOUNT_LABEL',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'maxTimesPerDay',
                    label: 'DONOR_GIVING_CARD_SETTING.EDIT.FIELDS.MAX_TIMES_PER_DAY_LABEL',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'n0'
                    }
                },
                {
                    name: 'isEnabled',
                    label: 'DONOR_GIVING_CARD_SETTING.EDIT.FIELDS.IS_ENABLED_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isStolen',
                    label: 'DONOR_GIVING_CARD_SETTING.EDIT.FIELDS.IS_STOLEN_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isLost',
                    label: 'DONOR_GIVING_CARD_SETTING.EDIT.FIELDS.IS_LOST_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'reportDescription',
                    label: 'DONOR_GIVING_CARD_SETTING.EDIT.FIELDS.REPORT_DESCRIPTION',
                    rules: 'string'
                },
            ]
        };
    }
}