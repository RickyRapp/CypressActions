import { action, observable } from 'mobx';
import { BasePreviewViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import moment from 'moment';

@applicationContext
class ScheduledGrantPreviewViewStore extends BasePreviewViewStore {
    @observable isEditable = false;
    @observable isCancelable = false;

    constructor(rootStore) {
        super(rootStore, {
            name: 'user',
            id: rootStore.routerStore.routerState.params.id,
            autoInit: false,
            routes: {
                edit: () => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.grant.edit', { id: this.id });
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
                        return this.rootStore.application.administration.grantStore.getScheduledGrant(id, params);
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
            if (this.item.remainingNumberOfPayments > 0) {
                const dateToEdit = moment(this.item.dateCreated).add(15, 'minutes');
                this.isEditable = moment().isBetween(this.item.dateCreated, dateToEdit);
                this.isCancelable = true;
            }
        }
    }
    @action.bound 
    async cancelGrant() {
        this.rootStore.modalStore.showConfirm('SCHEDULED_GRANT.CANCEL.QUESTION',
            async () => {
                try {
                    await this.rootStore.application.administration.grantStore.cancelScheduledGrant({ id: this.id });
                    this.rootStore.notificationStore.success('SCHEDULED_GRANT.CANCEL.SUCCESS');
                } catch (error) {
                    this.rootStore.notificationStore.error('SCHEDULED_GRANT.CANCEL.ERROR');
                }
                this.rootStore.routerStore.goTo('master.app.main.administration.grant.tab', {}, { headerTab: 2 });
            }
        );
    }
    @action.bound
    newGrant() {
        this.rootStore.routerStore.goTo('master.app.main.administration.grant.create');
    }
    @action.bound
    editGrant() {
        this.rootStore.routerStore.goTo('master.app.main.administration.grant.scheduled-edit', { id: this.id });
    }
}

export default ScheduledGrantPreviewViewStore;
