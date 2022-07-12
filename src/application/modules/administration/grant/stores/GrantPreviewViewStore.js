import { action, observable } from 'mobx';
import { BasePreviewViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class GrantPreviewViewStore extends BasePreviewViewStore {
    @observable isEditable = false;
    @observable statusList ;
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
                                'grantScheduledPayment',
                                'charity.charityAddresses',
                                'charity.charityBankAccounts',
                                'charityVirtualTransaction',
                                'charityVirtualTransaction.paymentType',
                                'charityVirtualTransaction.charityWithdrawTransaction',
                                'charityVirtualTransaction.charityWithdrawTransaction.paymentType'
                            ],
                        }
                      
                        return this.rootStore.application.administration.grantStore.getGrant(id, params);
                    }
                }
            }
        });
        this.getStatuses();
    }
    async getStatuses(){
        var grantEntity = 'GrantEntity';
        var response = await this.rootStore.application.administration.entityStatusLogStore.findStatus(this.rootStore.routerStore.routerState.params.id,grantEntity);
        this.statusList = response;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([this.getResource(this.id)]);
            return this.item.donationStatus.abrv === 'pending' || this.item.donationStatus.abrv === 'approved';
        }
    }
}

export default GrantPreviewViewStore;
