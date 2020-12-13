import { action } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { GrantRequestCreateForm } from 'application/charity/grant/forms';
import { localizationService, validatorService } from 'core/services';

@applicationContext
class GrantRequestCreateViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant-request-create',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        await rootStore.application.charity.grantStore.createRequest({ charityId: this.charityId, ...resource });
                    }
                }
            },
            FormClass: GrantRequestCreateForm,
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

export default GrantRequestCreateViewStore;
