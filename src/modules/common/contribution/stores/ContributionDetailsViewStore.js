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
        'contributionTransactions.paymentTransaction.done',
        'contributionTransactions.paymentTransaction.description',
        'contributionTransactions.paymentTransaction.currentBalance',
        'contributionTransactions.paymentTransaction.dateCreated',
        'contributionTransactions.paymentTransaction.paymentTransactionStatus',
        'contributionTransactions.paymentTransaction.paymentTransactionStatus.name',
        'contributionTransactions.paymentTransaction.paymentTransactionType',
        'contributionTransactions.paymentTransaction.paymentTransactionType.name',
        'contributionTransactions.paymentTransaction.paymentTransactionType.type',
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
        params.embed = [
            'bankAccount',
            'payerInformation',
            'payerInformation.address',
            'payerInformation.emailAddress',
            'payerInformation.phoneNumber',
            'contributionTransactions',
            'contributionTransactions.paymentTransaction',
            'contributionTransactions.paymentTransaction.paymentTransactionStatus',
            'contributionTransactions.paymentTransaction.paymentTransactionType'
        ];
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
    }
}

export default ContributionDetailsViewStore;