import { action, observable } from 'mobx';
import { GrantDonorAccountService, LookupService } from "common/data";
import { BaseViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class GrantRegularDetailsViewStore extends BaseViewStore {
    @observable grantDonorAccount = null;
    @observable paymentTransactionStatuses = null;
    @observable paymentTransactionTypes = null;

    constructor(rootStore, { id, highlightId }) {
        super(rootStore);
        debugger;
        this.id = id;
        this.highlightId = highlightId;
        this.grantDonorAccountService = new GrantDonorAccountService(rootStore.app.baasic.apiClient);
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
            'grant',
            'grant.charity',
            'createdByCoreUser',
            'donorAccount',
            'donorAccount.coreUser',
            'donorAccount.companyProfile',
            'grantDonorAccountTransactions',
            'grantDonorAccountTransactions.paymentTransaction',
            'grantDonorAccountTransactions.fee',
            'grantDonorAccountTransactions.fee.paymentTransaction'
        ];

        this.grantDonorAccount = await this.grantDonorAccountService.get(this.id, params);
        this.loaderStore.resume();
    }

    @action.bound async loadLookups() {
        const paymentTransactionStatusModels = await this.paymentTransactionStatusLookup.getAll();
        this.paymentTransactionStatuses = _.orderBy(paymentTransactionStatusModels.data, ['sortOrder'], ['asc']);

        const paymentTransactionTypeModels = await this.paymentTransactionTypeLookup.getAll();
        this.paymentTransactionTypes = _.orderBy(paymentTransactionTypeModels.data, ['sortOrder'], ['asc']);
    }
}

export default GrantRegularDetailsViewStore;