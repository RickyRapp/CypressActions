import { action, observable } from 'mobx';
import { BasePreviewViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class ScheduledGrantPreviewViewStore extends BasePreviewViewStore {
    @observable isEditable = false;

    constructor(rootStore) {
        super(rootStore, {
            name: 'user',
            id: rootStore.routerStore.routerState.params.id,
            autoInit: false,
            routes: {
                edit: () => {
                    this.rootStore.routerStore.goTo('master.app.main.donor.grant.edit', { id: this.id });
                }
            },
            actions: () => {
                return {
                    get: async (id) => {
                        const params = {
                            embed: [
                                'charity',
                                'donor',
                                'donor.donorAddresses',
                                'grantPurposeType',
                                'donationStatus',
                                'grantAcknowledgmentType',
                                'thirdPartyWebsite',
                                'grantScheduledPayment'
                            ],
                            donorId: this.donorId
                        }
                        return this.rootStore.application.donor.grantStore.getScheduledGrant(id, params);
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([this.getResource(this.id)]);
        }
    }
}

export default ScheduledGrantPreviewViewStore;
