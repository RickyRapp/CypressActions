import { action } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { GrantGivingCardCreateForm } from 'application/charity/grant/forms';

@applicationContext
class GrantGivingCardCreateViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant-giving-card-create',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        await rootStore.application.charity.grantStore.createGrantGivingCard({ charityId: this.charityId, ...resource });
                    }
                }
            },
            FormClass: GrantGivingCardCreateForm,
        });

        this.charityId = rootStore.userStore.applicationUser.id;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.resume();
        }
    }
}

export default GrantGivingCardCreateViewStore;
