import { action, observable } from 'mobx';
import { ContributionService, LookupService } from "common/data";
import { BaseViewStore } from "core/stores";
import _ from 'lodash';

class ContributionDetailsViewStore extends BaseViewStore {
    @observable contributionStatuses = null;
    @observable contribution = null;
    @observable paymentTypes = null;
    @observable paymentTransactionStatuses = null;
    @observable paymentTransactionTypes = null;

    fields = [
        'id',
        'amount',
        'description',
        'dateCreated',
        'dateUpdated',
        'paymentTypeId',
        'contributionStatusId',
        'confirmationNumber',
        'json',
        'bankAccount',
        'bankAccount.name',
        'payerInformation',
        'payerInformation.name',
        'payerInformation.address',
        'payerInformation.address.addressLine1',
        'payerInformation.address.addressLine2',
        'payerInformation.address.city',
        'payerInformation.address.state',
        'payerInformation.address.zipCode',
        'payerInformation.emailAddress',
        'payerInformation.emailAddress.email',
        'payerInformation.phoneNumber',
        'payerInformation.phoneNumber.number',
        'contributionTransactions',
        'contributionTransactions.id',
        'contributionTransactions.dateCreated',
        'contributionTransactions.paymentTransaction',
        'contributionTransactions.paymentTransaction.id',
        'contributionTransactions.paymentTransaction.amount',
        'contributionTransactions.paymentTransaction.description',
        'contributionTransactions.paymentTransaction.userBalance',
        'contributionTransactions.paymentTransaction.paymentTransactionStatusId',
        'contributionTransactions.paymentTransaction.paymentTransactionTypeId',
    ]

    constructor(rootStore, { id, highlightId }) {
        super(rootStore);

        this.id = id;
        this.highlightId = highlightId;
        this.contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        this.paymentTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');
        this.paymentTransactionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status');
        this.paymentTransactionTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-type');

        this.load();
    }

    @action.bound async load() {
        this.loaderStore.suspend();
        await this.loadLookups();

        let params = {};
        params.embed = ['bankAccount,payerInformation,payerInformation.address,payerInformation.emailAddress,payerInformation.phoneNumber,contributionTransaction,contributionTransactions,contributionTransactions.paymentTransaction'];
        params.fields = this.fields;
        let model = await this.contributionService.get(this.id, params);
        if (model.json && JSON.parse(model.json).paymentTypeInformations) {
            _.forOwn(JSON.parse(model.json).paymentTypeInformations, function (value, key) {
                model[key] = value;
            });
        }
        this.contribution = model;
        this.loaderStore.resume();
    }

    @action.bound async loadLookups() {
        const paymentTypeModels = await this.paymentTypeLookup.getAll();
        this.paymentTypes = _.orderBy(paymentTypeModels.data, ['sortOrder'], ['asc']);

        const paymentTransactionStatusModels = await this.paymentTransactionStatusLookup.getAll();
        this.paymentTransactionStatuses = _.orderBy(paymentTransactionStatusModels.data, ['sortOrder'], ['asc']);

        const paymentTransactionTypeModels = await this.paymentTransactionTypeLookup.getAll();
        this.paymentTransactionTypes = _.orderBy(paymentTransactionTypeModels.data, ['sortOrder'], ['asc']);
    }
}

export default ContributionDetailsViewStore;