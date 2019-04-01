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

        if (this.isContributionType) {
        }
        else if (this.isContributionSettingType) {
            embeds.push('contributionSetting');
        }

        return embeds.join(',');
    }

    @computed get isContributionType() {
        return this.type === 'contribution';
    }

    @computed get isContributionSettingType() {
        return this.type === 'contribution-setting';
    }

}

export default DonorAccountHeaderDetailsViewStore;