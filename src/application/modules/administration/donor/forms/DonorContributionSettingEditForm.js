import { FormBase } from 'core/components';
import moment from 'moment';

export default class DonorContributionSettingEditForm extends FormBase {
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
                    name: 'amount',
                    label: 'DONOR_CONTRIBUTION_SETTING.EDIT.FIELDS.AMOUNT_LABEL',
                    placeholder: 'DONOR_CONTRIBUTION_SETTING.EDIT.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'startDate',
                    label: 'DONOR_CONTRIBUTION_SETTING.EDIT.FIELDS.START_DATE_LABEL',
                    placeholder: 'DONOR_CONTRIBUTION_SETTING.EDIT.FIELDS.START_DATE_PLACEHOLDER',
                    rules: `required|min_date:${moment().add(1, 'days').format('YYYY-MM-DD')}`,
                    type: 'date'
                },
                {
                    name: 'donorBankAccountId',
                    label: 'DONOR_CONTRIBUTION_SETTING.EDIT.FIELDS.DONOR_BANK_ACCOUNT_LABEL',
                    placeholder: 'DONOR_CONTRIBUTION_SETTING.EDIT.FIELDS.DONOR_BANK_ACCOUNT_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'isEnabled',
                    label: 'DONOR_CONTRIBUTION_SETTING.EDIT.FIELDS.IS_ENABLED_LABEL',
                    placeholder: 'DONOR_CONTRIBUTION_SETTING.EDIT.FIELDS.IS_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                }
            ]
        }
    }
}