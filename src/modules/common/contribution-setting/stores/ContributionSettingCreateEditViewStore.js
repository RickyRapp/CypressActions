import { ContributionSettingForm } from 'modules/common/contribution-setting/forms';
import { ContributionSettingService } from 'common/data';
import { BaseContributionSettingCreateEditViewStore } from 'modules/common/contribution-setting/stores';
import _ from 'lodash';

class ContributionSettingCreateEditViewStore extends BaseContributionSettingCreateEditViewStore {
    constructor(rootStore, { onAfterCreate, onAfterUpdate, bankAccounts, contributionSettingType, id, editItem, userId }) {
        const contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);

        const config = {
            editCreateViewStore: {
                name: 'contribution setting',
                id: id,
                actions: {
                    create: async item => {
                        return await contributionSettingService.create(item);
                    },
                    update: async item => {
                        item.id = id;
                        return await contributionSettingService.update(item);
                    },
                    get: async (id) => {
                        editItem.donorAccountId = userId;
                        return editItem;
                    }
                },
                FormClass: ContributionSettingForm,
                onAfterCreate: onAfterCreate,
                onAfterUpdate: onAfterUpdate,
                goBack: false
            },
            bankAccounts: bankAccounts,
            contributionSettingType: contributionSettingType,
            item: editItem,
            userId: userId
        }

        super(rootStore, config);
    }
}

export default ContributionSettingCreateEditViewStore;