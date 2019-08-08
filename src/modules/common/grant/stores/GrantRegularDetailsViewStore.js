import { action, observable } from 'mobx';
import { GrantService, LookupService } from "common/data";
import { BaseViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class GrantRegularDetailsViewStore extends BaseViewStore {
    @observable grant = null;

    constructor(rootStore, { id, highlightId }) {
        super(rootStore);

        this.id = id;
        this.highlightId = highlightId;
        this.grantService = new GrantService(rootStore.app.baasic.apiClient);
        this.paymentTransactionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status');
        this.paymentTransactionTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-type');

        this.detailsModalParams = new ModalParams({
            notifyOutsideClick: true
        });

        this.params = {
            embed: [
                'donation',
                'donation.charity',
                'createdByCoreUser',
                'donorAccount',
                'donorAccount.coreUser',
                'donorAccount.companyProfile',
                'grantDonorAccountTransactions',
                'grantDonorAccountTransactions.paymentTransaction',
                'grantDonorAccountTransactions.paymentTransaction.paymentTransactionStatus',
                'grantDonorAccountTransactions.paymentTransaction.paymentTransactionType',
                'grantDonorAccountTransactions.fee',
                'grantDonorAccountTransactions.fee.paymentTransaction',
                'grantDonorAccountTransactions.fee.paymentTransaction.paymentTransactionStatus',
                'grantDonorAccountTransactions.fee.paymentTransaction.paymentTransactionType',
            ]
        };

        this.load();
    }

    @action.bound async load() {
        this.grant = await this.grantService.get(this.id, this.params);
    }
}

export default GrantRegularDetailsViewStore;