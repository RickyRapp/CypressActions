import { BasePreviewViewStore } from 'core/stores';
import { CharityService } from 'application/charity/services';

class CharityOnlineAccountPreviewViewStore extends BasePreviewViewStore {
    constructor(rootStore, charityId) {
        const id = charityId;

        super(rootStore, {
            name: 'user',
            autoInit: true,
            id: id,
            routes: {},
            actions: () => {
                const service = new CharityService(rootStore.application.baasic.apiClient);
                return {
                    get: async (id) => {
                        let params = {
                            embed: [
                                'coreUser',
                                'subscriptionType',
                                'charityAccountType',
                                'charityAccountType'
                            ],
                            fields: [
                                'coreUser',
                                'charityAccountType',
                                'subscriptionType',
                                'subscriptionAmount',
                                'subscriptionNextDate'
                            ]
                        }
                        let response = await service.get(id, params);
                        return response.data;
                    }
                }
            }
        });
    }
}

export default CharityOnlineAccountPreviewViewStore;
