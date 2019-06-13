import { FormBase } from 'core/components';
import { localizationService } from 'core/services'
import moment from 'moment';

export default class ContributionCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'donorAccountId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: localizationService.t('CONTRIBUTIONSETTINGFORM.AMOUNT'),
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'bankAccountId',
                    label: localizationService.t('CONTRIBUTIONSETTINGFORM.BANKACCOUNTID'),
                    rules: 'required|string'
                },
                {
                    name: 'contributionSettingTypeId',
                    label: localizationService.t('CONTRIBUTIONSETTINGFORM.CONTRIBUTIONSETTINGTYPEID'),
                    rules: 'required|string'
                },
                {
                    name: 'startDate',
                    label: localizationService.t('CONTRIBUTIONSETTINGFORM.STARTDATE'),
                    rules: 'date'
                },
                {
                    name: 'lowBalanceAmount',
                    label: localizationService.t('CONTRIBUTIONSETTINGFORM.LOWBALANCEAMOUNT'),
                    rules: 'numeric'
                },
                {
                    name: 'enabled',
                    label: localizationService.t('CONTRIBUTIONSETTINGFORM.ENABLED'),
                    rules: 'boolean',
                    type: 'checkbox'
                }
            ]
        }
    }
};