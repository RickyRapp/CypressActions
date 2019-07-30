import { action, observable } from 'mobx';
import { GrantService, LookupService } from "common/data";
import { BaseViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class GrantCombinedDetailsViewStore extends BaseViewStore {
    @observable grant = null;
    @observable paymentTransactionStatuses = null;
    @observable paymentTransactionTypes = null;

    constructor(rootStore, { id }) {
        super(rootStore);

        this.id = id;
        this.grantService = new GrantService(rootStore.app.baasic.apiClient);
        this.paymentTransactionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status');
        this.paymentTransactionTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-type');

        this.detailsModalParams = new ModalParams({
            notifyOutsideClick: true
        });

        this.load();
    }

    @action.bound async load() {
        this.loaderStore.suspend();
        await this.loadLookups();

        let params = {};
        params.embed = [
            'grantDonorAccounts',
            'grantDonorAccounts.createdByCoreUser',
            'grantDonorAccounts.donorAccount',
            'grantDonorAccounts.donorAccount.coreUser',
            'grantDonorAccounts.donorAccount.companyProfile',
            'charity',
            'grantDonorAccounts.grantDonorAccountTransactions',
            'grantDonorAccounts.grantDonorAccountTransactions.paymentTransaction',
            'grantDonorAccounts.grantDonorAccountTransactions.fee',
            'grantDonorAccounts.grantDonorAccountTransactions.fee.paymentTransaction'
        ];
        this.grant = await this.grantService.get(this.id, params);
        this.loaderStore.resume();
    }

    @action.bound async loadLookups() {
        const paymentTransactionStatusModels = await this.paymentTransactionStatusLookup.getAll();
        this.paymentTransactionStatuses = _.orderBy(paymentTransactionStatusModels.data, ['sortOrder'], ['asc']);

        const paymentTransactionTypeModels = await this.paymentTransactionTypeLookup.getAll();
        this.paymentTransactionTypes = _.orderBy(paymentTransactionTypeModels.data, ['sortOrder'], ['asc']);
    }
}

export default GrantCombinedDetailsViewStore;