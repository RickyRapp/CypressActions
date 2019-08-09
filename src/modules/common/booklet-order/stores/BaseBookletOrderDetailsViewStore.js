import { action, observable } from 'mobx';
import { BookletOrderService, LookupService } from "common/data";
import { BaseViewStore } from "core/stores";
import _ from 'lodash';

class BookletOrderDetailsViewStore extends BaseViewStore {
    @observable bookletOrderStatuses = null;
    @observable bookletOrder = null;
    @observable denominationTypes = null;
    @observable paymentTransactionStatuses = null;
    @observable paymentTransactionTypes = null;
    @observable deliveryMethodTypes = null;
    @observable accountTypes = null;

    // fields = [
    //     'id',
    //     'amount',
    //     'description',
    //     'dateCreated',
    //     'dateUpdated',
    //     'confirmationNumber',
    //     'deliveryMethodTypeId',
    //     'trackingNumber',
    //     'accountTypeId',
    //     'deduction',
    //     'feeCharge',
    //     'bookletOrderItems',
    //     'bookletOrderItems.id',
    //     'bookletOrderItems.count',
    //     'bookletOrderItems.denominationTypeId',
    //     'bookletOrderItems.denominationType',
    //     'bookletOrderItems.denominationType.sortOrder',
    //     'bookletOrderItems.bookletOrderItemBooklets',
    //     'bookletOrderItems.bookletOrderItemBooklets.booklet',
    //     'bookletOrderItems.bookletOrderItemBooklets.booklet.code',
    //     'bookletOrderTransactions',
    //     'bookletOrderTransactions.id',
    //     'bookletOrderTransactions.dateCreated',
    //     'bookletOrderTransactions.fee',
    //     'bookletOrderTransactions.fee.paymentTransaction',
    //     'bookletOrderTransactions.fee.paymentTransaction.id',
    //     'bookletOrderTransactions.fee.paymentTransaction.amount',
    //     'bookletOrderTransactions.fee.paymentTransaction.description',
    //     'bookletOrderTransactions.fee.paymentTransaction.done',
    //     'bookletOrderTransactions.fee.paymentTransaction.currentBalance',
    //     'bookletOrderTransactions.fee.paymentTransaction.paymentTransactionStatus',
    //     'bookletOrderTransactions.fee.paymentTransaction.paymentTransactionStatus.name',
    //     'bookletOrderTransactions.fee.paymentTransaction.paymentTransactionStatus.abrv',
    //     'bookletOrderTransactions.fee.paymentTransaction.paymentTransactionType',
    //     'bookletOrderTransactions.fee.paymentTransaction.paymentTransactionType.name',
    //     'bookletOrderTransactions.fee.paymentTransaction.paymentTransactionType.abrv',
    //     'bookletOrderTransactions.paymentTransaction',
    //     'bookletOrderTransactions.paymentTransaction.id',
    //     'bookletOrderTransactions.paymentTransaction.amount',
    //     'bookletOrderTransactions.paymentTransaction.description',
    //     'bookletOrderTransactions.paymentTransaction.done',
    //     'bookletOrderTransactions.paymentTransaction.currentBalance',
    //     'bookletOrderTransactions.paymentTransaction.paymentTransactionStatus',
    //     'bookletOrderTransactions.paymentTransaction.paymentTransactionStatus.name',
    //     'bookletOrderTransactions.paymentTransaction.paymentTransactionStatus.abrv',
    //     'bookletOrderTransactions.paymentTransaction.paymentTransactionType',
    //     'bookletOrderTransactions.paymentTransaction.paymentTransactionType.name',
    //     'bookletOrderTransactions.paymentTransaction.paymentTransactionType.abrv',
    // ]

    constructor(rootStore, { id, highlightId }) {
        super(rootStore);

        this.id = id;
        this.highlightId = highlightId;
        this.bookletOrderService = new BookletOrderService(rootStore.app.baasic.apiClient);
        this.bookletOrderStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'booklet-order-status');
        this.paymentTransactionStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-status');
        this.paymentTransactionTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-transaction-type');
        this.denominationTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'denomination-type');
        this.deliveryMethodTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'delivery-method-type');
        this.accountTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'account-type');

        this.load();
    }

    @action.bound async load() {
        this.loaderStore.suspend();
        await this.loadLookups();

        let params = {};
        params.embed = [
            'bookletOrderItems',
            'bookletOrderItems.denominationType',
            'bookletOrderItems.bookletOrderItemBooklets',
            'bookletOrderItems.bookletOrderItemBooklets.booklet',
            'bookletOrderTransactions',
            'bookletOrderTransactions.fee',
            'bookletOrderTransactions.paymentTransaction',
            'bookletOrderTransactions.paymentTransaction.paymentTransactionStatus',
            'bookletOrderTransactions.paymentTransaction.paymentTransactionType',
            'bookletOrderTransactions.fee.paymentTransaction',
            'bookletOrderTransactions.fee.paymentTransaction.paymentTransactionStatus',
            'bookletOrderTransactions.fee.paymentTransaction.paymentTransactionType'
        ];
        // params.fields = this.fields;
        this.bookletOrder = await this.bookletOrderService.get(this.id, params);
        this.loaderStore.resume();
    }

    @action.bound async loadLookups() {
        let denominationTypesModels = await this.denominationTypeLookupService.getAll();
        this.denominationTypes = _.orderBy(denominationTypesModels.data, ['sortOrder'], ['asc']);

        const bookletOrderStatusModels = await this.bookletOrderStatusLookup.getAll();
        this.bookletOrderStatuses = _.orderBy(bookletOrderStatusModels.data, ['sortOrder'], ['asc']);

        const paymentTransactionStatusModels = await this.paymentTransactionStatusLookup.getAll();
        this.paymentTransactionStatuses = _.orderBy(paymentTransactionStatusModels.data, ['sortOrder'], ['asc']);

        const paymentTransactionTypeModels = await this.paymentTransactionTypeLookup.getAll();
        this.paymentTransactionTypes = _.orderBy(paymentTransactionTypeModels.data, ['sortOrder'], ['asc']);

        const deliveryMethodTypeModels = await this.deliveryMethodTypeLookupService.getAll();
        this.deliveryMethodTypes = _.orderBy(deliveryMethodTypeModels.data, ['sortOrder'], ['asc']);

        const accountTypeModels = await this.accountTypeLookupService.getAll();
        this.accountTypes = _.orderBy(accountTypeModels.data, ['sortOrder'], ['asc']);
    }
}

export default BookletOrderDetailsViewStore;