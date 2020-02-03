import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { CharityService } from 'application/charity/services';

const Types = {
    Profile: 0
};

@applicationContext
class CharityPageHeaderOverviewViewStore extends BaseViewStore {
    @observable charity = null;
    prefixTypes = null;

    constructor(rootStore, { charityId, type }) {
        super(rootStore)

        this.charityId = charityId;
        this.type = type;
        this.Types = Types;
        this.rootStore = rootStore;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.charity.list'
            )
        }
        else {
            await this.fetch([
                this.fetchCharity()
            ]);
        }
    }

    @action.bound
    async fetchCharity() {
        const service = new CharityService(this.rootStore.application.baasic.apiClient);

        let params = {
            embed: [
                'charityAccountType'
            ],
            fields: [
                'id',
                'name',
                'taxId',
                'balance'
            ]
        }

        this.setCharityOptions(params);

        const response = await service.get(this.charityId, params);
        this.charity = response.data;
    }

    setCharityOptions(params) {
        switch (this.type) {
            case Types.Profile:
                params.fields.push('coreUserId')
                break;
            default:
                break;
        }

        return params;
    }
}

export default CharityPageHeaderOverviewViewStore;
