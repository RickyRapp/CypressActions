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
                            id: this.item.donorAccount.id,
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
                                'donorAccount',
                                'donorAccount.donorAccountAddresses',
                                'grantPurposeType',
                                'donationStatus',
                                'grantAcknowledgmentType',
                                'grantDonorAccountTransactions',
                                'grantDonorAccountTransactions.paymentTransaction',
                                'grantDonorAccountTransactions.paymentTransaction.paymentTransactionStatus',
                                'grantDonorAccountTransactions.paymentTransaction.paymentTransactionType'
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
            if (this.hasPermission('theDonorsFundAdministrationSection.update')) {
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
