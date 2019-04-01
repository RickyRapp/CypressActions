import { FormBase } from 'core/components';

export default class ContributionSettingCreateForm extends FormBase {
    constructor(hooks, settingTypeId) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'amount',
                'bankAccountId',
                'contributionSettingTypeId',
                'enabled',
                'startDate',
                'lowBalanceAmount'
            ],

            labels: {
                'amount': 'Amount',
                'bankAccountId': 'Bank Account',
                'contributionSettingTypeId': 'Setting Type',
                'enabled': 'Enabled',
                'startDate': 'Start Date',
                'lowBalanceAmount': 'Low Balance Amount'
            },

            placeholders: {
                'amount': 'Enter Amount',
                'bankAccountId': 'Choose Bank Account',
                'contributionSettingTypeId': 'Choose Setting Type',
                'enabled': 'Enabled',
                'startDate': 'Select Start Date',
                'lowBalanceAmount': 'Enter Low Balance Amount',

            },

            rules: {
                'amount': 'required|numeric|min:0',
                'bankAccountId': 'required|string',
                'contributionSettingTypeId': 'required|string',
                'startDate': 'date',
                'lowBalanceAmount': 'numeric',
            },

            types: {
                'enabled': 'checkbox'
            }
        };
    }
};