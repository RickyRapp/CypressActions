import { BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class DonationLogViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donation-log',
            id: rootStore.routerStore.routerState.params.id,
            actions: () => {
                return {
                    get: async (id) => {
                        
                    }
                }
            }
        });
    }
}

export default DonationLogViewStore;
