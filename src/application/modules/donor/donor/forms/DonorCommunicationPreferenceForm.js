import { FormBase } from 'core/components';

export default class DonorCommunicationPreferenceForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'cardTransactionAmountExceeding',
                    label: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.CARD_TRANSACTION_AMOUNT_EXCEEDING_LABEL',
                    placeholder: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.CARD_TRANSACTION_AMOUNT_EXCEEDING_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'cardNonPresentTransactionAmountExceeding',
                    label: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.CARD_NON_PRESENT_TRANSACTION_AMOUNT_EXCEEDING_LABEL',
                    placeholder: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.CARD_NON_PRESENT_TRANSACTION_AMOUNT_EXCEEDING_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'checkAmountExceeding',
                    label: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.CHECK_AMOUNT_EXCEEDING_LABEL',
                    placeholder: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.CHECK_AMOUNT_EXCEEDING_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'isCheckInventoryRunningLowEnabled',
                    label: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.IS_CHECK_INVENTORY_RUNNING_LOW_ENABLED_LABEL',
                    placeholder: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.IS_CHECK_INVENTORY_RUNNING_LOW_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'thirdPartyWebsiteAmountExceeding',
                    label: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.CHARITY_WEBSITE_AMOUNT_EXCEEDING_LABEL',
                    placeholder: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.CHARITY_WEBSITE_AMOUNT_EXCEEDING_PLACEHODLER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'isNewGrantRequestEnabled',
                    label: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.IS_NEW_GRANT_REQUEST_ENABLED_LABEL',
                    placeholder: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.IS_NEW_GRANT_REQUEST_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'donorAvailableBalanceRunsBelow',
                    label: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.DONOR_AVAILABLE_BALANCE_RUNS_BELOW_LABEL',
                    placeholder: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.DONOR_AVAILABLE_BALANCE_RUNS_BELOW_PLACEHODLER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'isDonorStatementAvailableEnabled',
                    label: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.IS_DONOR_STATEMENT_AVAILABLE_ENABLED_LABEL',
                    placeholder: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.IS_DONOR_STATEMENT_AVAILABLE_ENABLED_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'investmentPoolDropsBelow',
                    label: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.INVESTMENT_POOL_DROPS_BELOW_LABEL',
                    placeholder: 'DONOR.COMMUNICATION_PREFERENCE.FIELDS.INVESTMENT_POOL_DROPS_BELOW_PLACEHODLER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'p2',
                        step: 0.001
                    }
                }
            ]
        };
    }
}
