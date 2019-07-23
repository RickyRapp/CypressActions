import { action, observable, computed } from 'mobx';
import { DonorAccountService, LookupService } from "common/data";
import { BaseViewStore } from 'core/stores';

class DonorAccountHeaderDetailsViewStore extends BaseViewStore {
    @observable donorAccount = null;
    @observable accountTypes = null;

    constructor(rootStore, userId, type) {
        super(rootStore);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.type = type;
        this.userId = userId;
        this.load();
    }

    @action.bound
    async load() {
        this.accountTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'account-type');
        let accountTypesModels = await this.accountTypeLookupService.getAll();
        this.accountTypes = _.orderBy(accountTypesModels.data, ['sortOrder'], ['asc']);

        const options = this.getComponentsEmbeds();
        let params = {};
        params.embed = options.embeds;
        params.fields = options.fields;
        this.donorAccount = await this.donorAccountService.get(this.userId, params);
    }

    getComponentsEmbeds() {
        let embeds = ['coreUser,companyProfile'];
        let fields = ['id', 'donorName', 'availableBalance', 'accountTypeId']

        if (this.isDonorAccountType) {
        }
        else if (this.isContributionType) {
            fields.push(['initialContribution', 'contributionMinimumAdditional', 'contributionMinimumInitial']);
        }
        else if (this.isContributionSettingType) {
            fields.push(['initialContribution', 'contributionMinimumAdditional', 'contributionMinimumInitial']);
            embeds.push('contributionSetting');
        }
        else if (this.isActivityAndHistoryType) {
            fields.push(['balanceOnHold']);
        }
        else if (this.isGrantType) {
            fields.push(['lineOfCredit', 'grantFee']);
        }
        else if (this.isBookletOrderType) {
            fields.push(['lineOfCredit', 'certificateFee', 'certificateDeduction']);
        }

        return { embeds: embeds.join(','), fields: fields.join(',') };
    }

    @computed get isDonorAccountType() {
        return this.type === 'donor-account';
    }

    @computed get isContributionType() {
        return this.type === 'contribution';
    }

    @computed get isContributionSettingType() {
        return this.type === 'contribution-setting';
    }

    @computed get isActivityAndHistoryType() {
        return this.type === 'activity-and-history';
    }

    @computed get isGrantType() {
        return this.type === 'grant';
    }

    @computed get isBookletOrderType() {
        return this.type === 'booklet-order';
    }
}

export default DonorAccountHeaderDetailsViewStore;