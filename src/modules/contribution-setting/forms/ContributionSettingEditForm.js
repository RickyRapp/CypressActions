import { FormBase } from 'core/components';

export default class ContributionSettingEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
                'amount',
                'bankAccountId',
                'contributionSettingTypeId',
                'enabled',
                'startDate',
                'lowBalanceAmount',
                'dateUpdated'
            ],

            labels: {
                'amount': 'Amount',
                'bankAccountId': 'Bank Account',
                'contributionSettingTypeId': 'Setting Type',
                'enabled': 'Enabled',
                'startDate': 'Date Initiate',
                'lowBalanceAmount': 'Low Balance Amount'
            },

            placeholders: {
                'amount': 'Enter Amount',
                'bankAccountId': 'Choose Bank Account',
                'contributionSettingTypeId': 'Choose Setting Type',
                'enabled': 'Enabled',
                'startDate': 'Select Date To Initiate',
                'lowBalanceAmount': 'Enter Low Balance Amount',

            },

            rules: {
                'id': 'required|string',
                'amount': 'required|numeric|min:0',
                'bankAccountId': 'required|string',
                'contributionSettingTypeId': 'required|string',
                'startDate': 'date',
                'lowBalanceAmount': 'numeric',
                'dateUpdated': 'date'
            },

            types: {
                'enabled': 'checkbox'
            }
        };
    }
};