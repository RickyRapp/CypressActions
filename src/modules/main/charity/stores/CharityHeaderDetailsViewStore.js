import { action, observable, computed } from 'mobx';
import { CharityService } from "common/data";
import { BaseViewStore } from 'core/stores';

class CharityHeaderDetailsViewStore extends BaseViewStore {
    @observable charity = null;

    constructor(rootStore, userId, type) {
        super(rootStore);
        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.type = type;
        this.userId = userId;
        this.getResource();
    }

    @action.bound
    async getResource() {
        let embeds = this.getComponentsEmbeds();
        let params = {};
        params.embed = embeds;
        this.charity = await this.charityService.get(this.userId, params)
    }

    getComponentsEmbeds() {
        let embeds = ['coreUser'];

        if (this.isCharityType) {
        }

        return embeds.join(',');
    }

    @computed get isCharityType() {
        return this.type === 'charity';
    }
}

export default CharityHeaderDetailsViewStore;