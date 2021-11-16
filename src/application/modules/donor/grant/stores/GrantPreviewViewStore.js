import { action, observable } from 'mobx';
import { BasePreviewViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import moment from 'moment';

@applicationContext
class GrantPreviewViewStore extends BasePreviewViewStore {
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
                        return this.rootStore.application.donor.grantStore.getGrant(id, params);
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
            if (this.item.donationStatus.abrv === 'pending' || this.item.donationStatus.abrv === 'approved') {
                const dateToEdit = moment(this.item.dateCreated).add(15, 'minutes');
                this.isEditable = moment().isBetween(this.item.dateCreated, dateToEdit);
            }
        }
    }
    @action.bound
    async cancelGrant() {
        this.rootStore.modalStore.showConfirm(
			`Are you sure you want to cancel this grant?`,
			async () => {
				try {
					await this.rootStore.application.donor.grantStore.cancelGrant({ id: this.id });
					this.rootStore.notificationStore.success('Successfully canceled grant.');
                    this.rootStore.routerStore.goTo('master.app.main.donor.activity', {}, { headerTab: 2 });
				} catch ({ data }) {
					if (data && data.message) {
						this.rootStore.notificationStore.error(data.message);
					}
					else {
						this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_UPDATE');
					}
				}
			}
		);
    }
    @action.bound
    newGrant() {
        this.rootStore.routerStore.goTo('master.app.main.donor.grant.create');
    }
}

export default GrantPreviewViewStore;
