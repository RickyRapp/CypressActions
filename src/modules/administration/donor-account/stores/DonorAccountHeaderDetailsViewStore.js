import { action, observable, computed } from 'mobx';
import { DonorAccountService } from "common/data";
import { BaseViewStore } from 'core/stores';

class DonorAccountHeaderDetailsViewStore extends BaseViewStore {
    @observable donorAccount = null;

    constructor(rootStore, userId, type) {
        super(rootStore);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.type = type;
        this.userId = userId;
        this.getResource();
    }

    @action.bound
    async getResource() {
        let embeds = this.getComponentsEmbeds();
        let params = {};
        params.embed = embeds;
        this.donorAccount = await this.donorAccountService.get(this.userId, params)
    }

    getComponentsEmbeds() {
        let embeds = ['coreUser,donorAccountAddresses,address'];

        if (this.isDonorAccountType) {
        }
        else if (this.isContributionType) {
        }
        else if (this.isContributionSettingType) {
            embeds.push('contributionSetting');
        }
        else if (this.isActivityAndHistoryType) {
        }
        else if (this.isGrantType) {
        }

        return embeds.join(',');
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
}

export default DonorAccountHeaderDetailsViewStore;