import { ContributionSettingService } from "common/data";
import { ContributionSettingListFilter } from 'modules/administration/contribution-setting/models';
import { BaseContributionSettingListViewStore } from 'modules/common/contribution-setting/stores';
import _ from 'lodash';

class ContributionSettingListViewStore extends BaseContributionSettingListViewStore {
    constructor(rootStore) {
        const contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);
        const userId = rootStore.routerStore.routerState.params.userId;
        let filter = new ContributionSettingListFilter();
        filter.donorAccountId = userId;

        const listViewStore = {
            find: async params => {
                _.assign(params, filter);
                let response = await contributionSettingService.find(params)
                this.contributionSettings = response.item;
                return response.item;
            }
        }

        const config = {
            listViewStore: listViewStore,
            userId: userId
        }

        super(rootStore, config);

        this.load();
    }
}

export default ContributionSettingListViewStore;