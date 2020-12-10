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
            id: rootStore.routerStore.routerState.params.editId,
            autoInit: false,
            routes: {
                edit: () => {
                    this.rootStore.routerStore.goTo('master.app.main.donor.grant.edit', { editId: this.id }, { donorId: this.item.donorId });
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
                                'thirdPartyWebsite'
                            ],
                            donorId: this.donorId
                        }
                        return this.rootStore.application.grant.grantStore.getDetails(id, params);
                    }
                }
            }
        });

        this.hasAdministratorsPermission = this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')
        if (!this.hasAdministratorsPermission) {
            this.donorId = rootStore.userStore.user.id;
        }
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([this.getResource(this.id)]);
            if (this.item.donationStatus.abrv === 'pending') {
                if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
                    this.isEditable = true;
                }
                else {
                    const dateToEdit = moment(this.item.dateCreated).add(15, 'minutes');
                    this.isEditable = moment().isBetween(this.item.dateCreated, dateToEdit);
                }
            }
        }
    }
}

export default GrantPreviewViewStore;
