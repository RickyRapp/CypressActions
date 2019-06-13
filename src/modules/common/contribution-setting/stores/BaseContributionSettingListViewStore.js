import { action, observable, computed } from 'mobx';
import { LookupService, BankAccountService } from "common/data";
import { BaseViewStore } from "core/stores";
import _ from 'lodash';

class BaseContributionSettingListViewStore extends BaseViewStore {
    @observable contributionSettings = null;
    @observable contributionSettingType = null;
    @observable bankAccounts = null;
    @observable availableContributionSettingType = null;

    constructor(rootStore, config) {
        super(rootStore);
        this.find = config.listViewStore.find;
        this.userId = config.userId;
        this.bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);
        this.contributionSettingTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'contribution-setting-type');
    }

    @action.bound async load() {
        await this.fetch([
            this.find({}),
            this.loadLookups(),
            this.getBankAccounts()
        ])
        await this.getAvailableContributionSettingType();
    }

    @action.bound async loadLookups() {
        let contributionSettingTypeModels = await this.contributionSettingTypeLookupService.getAll();
        this.contributionSettingType = _.orderBy(contributionSettingTypeModels.data, ['sortOrder'], ['asc']);
    }

    @action.bound async getBankAccounts() {
        let params = {};
        params.embed = 'bankAccount'
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        params.donorAccountId = this.userId;
        this.bankAccounts = (await this.bankAccountService.find(params)).item;
    }

    @action.bound async getAvailableContributionSettingType() {
        this.availableContributionSettingType = null;
        let usedSettingTypeIds = _.map(this.contributionSettings, function (x) { return x.contributionSettingTypeId; });
        let availableContributionSettingType = [];
        _.forEach(this.contributionSettingType, function (x) {
            if (!_.includes(usedSettingTypeIds, x.id)) {
                availableContributionSettingType.push(x);
            }
        });
        this.availableContributionSettingType = availableContributionSettingType;
    }

    @computed get lowBalanceSettingId() {
        if (this.contributionSettings) {
            let lowBalanceContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'low-balance' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: lowBalanceContributionSettingTypeId })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: lowBalanceContributionSettingTypeId }).id;
            }
        }
        return null;
    }

    @computed get oneTimeSettingId() {
        if (this.contributionSettings) {
            let automaticContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'automatic' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: null })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: null }).id;
            }
        }
        return null;
    }

    @computed get weeklySettingId() {
        if (this.contributionSettings) {
            let automaticContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'automatic' }).id;
            let contributionSettingRecurringTypeId = _.find(this.contributionSettingRecurringType, { abrv: 'every-week' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId }).id;
            }
        }
        return null;
    }

    @computed get automaticEverySecondWeekSettingId() {
        if (this.contributionSettings) {
            let automaticContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'automatic' }).id;
            let contributionSettingRecurringTypeId = _.find(this.contributionSettingRecurringType, { abrv: 'every-second-week' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId }).id;
            }
        }
        return null;
    }

    @computed get automaticEveryThirdWeekSettingId() {
        if (this.contributionSettings) {
            let automaticContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'automatic' }).id;
            let contributionSettingRecurringTypeId = _.find(this.contributionSettingRecurringType, { abrv: 'every-third-week' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId }).id;
            }
        }
        return null;
    }

    @computed get automaticEveryMonthSettingId() {
        if (this.contributionSettings) {
            let automaticContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'automatic' }).id;
            let contributionSettingRecurringTypeId = _.find(this.contributionSettingRecurringType, { abrv: 'every-month' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId }).id;
            }
        }
        return null;
    }

    @computed get automaticEverySecondMonthSettingId() {
        if (this.contributionSettings) {
            let automaticContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'automatic' }).id;
            let contributionSettingRecurringTypeId = _.find(this.contributionSettingRecurringType, { abrv: 'every-second-month' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId }).id;
            }
        }
        return null;
    }

    @computed get automaticEveryFourthMonthSettingId() {
        if (this.contributionSettings) {
            let automaticContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'automatic' }).id;
            let contributionSettingRecurringTypeId = _.find(this.contributionSettingRecurringType, { abrv: 'every-fourth-month' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId }).id;
            }
        }
        return null;
    }

    @computed get automaticEverySixMonthSettingId() {
        if (this.contributionSettings) {
            let automaticContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'automatic' }).id;
            let contributionSettingRecurringTypeId = _.find(this.contributionSettingRecurringType, { abrv: 'every-six-month' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId }).id;
            }
        }
        return null;
    }

    @computed get automaticEveryYearSettingId() {
        if (this.contributionSettings) {
            let automaticContributionSettingTypeId = _.find(this.contributionSettingType, { abrv: 'automatic' }).id;
            let contributionSettingRecurringTypeId = _.find(this.contributionSettingRecurringType, { abrv: 'every-year' }).id;
            if (_.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId })) {
                return _.find(this.contributionSettings, { contributionSettingTypeId: automaticContributionSettingTypeId, contributionSettingRecurringTypeId: contributionSettingRecurringTypeId }).id;
            }
        }
        return null;
    }
}

export default BaseContributionSettingListViewStore;