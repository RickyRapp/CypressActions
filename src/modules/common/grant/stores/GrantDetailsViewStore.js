import { action, observable, computed } from 'mobx';
import { GrantService, LookupService, DonorAccountService } from "common/data";
import { BaasicDropdownStore, BaseViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class GrantDetailsViewStore extends BaseViewStore {
    @observable grant = null;
    @observable paymentTransactionStatuses = null;
    @observable paymentTransactionTypes = null;

    constructor(rootStore, { id, highlightId }) {
        super(rootStore);

        this.id = id;
        this.highlightId = highlightId;
        this.grantService = new GrantService(rootStore.app.baasic.apiClient);
        this.paymentTransactionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status');
        this.paymentTransactionTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-type');

        this.load();
    }

    @action.bound async load() {
        this.loaderStore.suspend();
        await this.loadLookups();

        let params = {};
        params.embed = [
            'charity',
            'donorAccount',
            'donorAccount.coreUser',
            'donorAccount.companyProfile',
            'grantPurposeMember',
            'grantDonorAccountTransactions',
            'grantDonorAccountTransactions.paymentTransaction',
            'grantDonorAccountTransactions.fee',
            'grantDonorAccountTransactions.fee.paymentTransaction'
        ];
        params.fields = [
            'dateCreated',
            'description',
            'dateUpdated',
            'amount',
            'charity',
            'charity.name',
            'donorAccount',
            'donorAccount.donorName',
            'grantPurposeMember',
            'grantPurposeMember.name',
            'grantDonorAccountTransactions',
            'grantDonorAccountTransactions.id',
            'grantDonorAccountTransactions.paymentTransaction',
            'grantDonorAccountTransactions.paymentTransaction.id',
            'grantDonorAccountTransactions.paymentTransaction.amount',
            'grantDonorAccountTransactions.paymentTransaction.dateCreated',
            'grantDonorAccountTransactions.paymentTransaction.userBalance',
            'grantDonorAccountTransactions.paymentTransaction.paymentTransactionStatusId',
            'grantDonorAccountTransactions.paymentTransaction.paymentTransactionTypeId',
            'grantDonorAccountTransactions.fee',
            'grantDonorAccountTransactions.fee.id',
            'grantDonorAccountTransactions.fee.paymentTransaction',
            'grantDonorAccountTransactions.fee.paymentTransaction.id',
            'grantDonorAccountTransactions.fee.paymentTransaction.amount',
            'grantDonorAccountTransactions.fee.paymentTransaction.dateCreated',
            'grantDonorAccountTransactions.fee.paymentTransaction.userBalance',
            'grantDonorAccountTransactions.fee.paymentTransaction.paymentTransactionStatusId',
            'grantDonorAccountTransactions.fee.paymentTransaction.paymentTransactionTypeId',
        ];
        let model = await this.grantService.get(this.id, params);
        this.grant = model;
        this.loaderStore.resume();
    }

    @action.bound async loadLookups() {
        const paymentTransactionStatusModels = await this.paymentTransactionStatusLookup.getAll();
        this.paymentTransactionStatuses = _.orderBy(paymentTransactionStatusModels.data, ['sortOrder'], ['asc']);

        const paymentTransactionTypeModels = await this.paymentTransactionTypeLookup.getAll();
        this.paymentTransactionTypes = _.orderBy(paymentTransactionTypeModels.data, ['sortOrder'], ['asc']);
    }
}

export default GrantDetailsViewStore;