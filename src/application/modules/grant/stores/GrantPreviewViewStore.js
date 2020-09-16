import { action, observable } from 'mobx';
import { BasePreviewViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { GrantService } from 'application/grant/services';
import moment from 'moment';

@applicationContext
class GrantPreviewViewStore extends BasePreviewViewStore {
    @observable isEditable = false;

    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.editId;

        super(rootStore, {
            name: 'user',
            autoInit: true,
            id: id,
            routes: {
                edit: () => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.grant.edit',
                        {
                            id: this.item.donor.id,
                            editId: this.id
                        }
                    );
                }
            },
            actions: () => {
                const service = new GrantService(rootStore.application.baasic.apiClient);
                return {
                    get: async (id) => {
                        let params = {
                            embed: [
                                'charity',
                                'debitCharityTransaction',
                                'debitCharityTransaction.paymentTransaction',
                                'debitCharityTransaction.paymentType',
                                'donor',
                                'donor.donorAddresses',
                                'grantPurposeType',
                                'donationStatus',
                                'grantAcknowledgmentType',
                                'grantDonorTransactions',
                                'grantDonorTransactions.paymentTransaction',
                                'grantDonorTransactions.paymentTransaction.paymentTransactionStatus',
                                'grantDonorTransactions.paymentTransaction.paymentTransactionType',
                                'thirdPartyWebsite'
                            ]
                        }
                        let response = await service.get(id, params);
                        return response.data;
                    }
                }
            }
        });
    }

    @action.bound
    async getResource(id) {
        await super.getResource(id);
        if (this.item.donationStatus.abrv === 'pending') {
            if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
                this.isEditable = true;
            }
            else {
                const dateToEdit = moment(this.item.dateCreated).add('minutes', 15);
                this.isEditable = moment().isBetween(this.item.dateCreated, dateToEdit);
            }
        }
    }
}

export default GrantPreviewViewStore;
