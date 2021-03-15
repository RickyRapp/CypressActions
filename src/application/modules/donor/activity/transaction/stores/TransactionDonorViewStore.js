import { ModalParams } from 'core/models';
import { BaseViewStore, TableViewStore } from 'core/stores';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { action, observable } from 'mobx';

class TransactionTabViewStore extends BaseViewStore {
    @observable donor = null;
    @observable isPendingTransactionVisible = null;
    @observable isChecksOnHoldVisible = null;

    constructor(rootStore) {
        super(rootStore);
        this.pendingTransactionTableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'paymentTransaction.dateUpdated',
                    title: 'ACTIVITY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'paymentTransaction.description',
                    title: 'ACTIVITY.LIST.COLUMNS.PENDING_TRANSACTION_DESCRIPTION_LABEL'
                },
                {
                    key: 'paymentTransaction',
                    title: 'ACTIVITY.LIST.COLUMNS.PENDING_TRANSACTION_AMOUNT_LABEL',
                    format: {
                        type: 'transaction-currency',
                        value: '$',
                    }
                },
            ],
            actions: {
                onPreview: (item) => this.openModalStore(item),
            },
            actionsRender: {
                onPreviewRender: (item) => {
                    return !isNullOrWhiteSpacesOrUndefinedOrEmpty(item.json);
                }
            }
        });

        this.checksOnHoldTableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'charity.name',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.CHARITY_LABEL'
                },
                {
                    key: 'certificate.code',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.CODE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return `${item.certificate.booklet.code}-${item.certificate.code}`
                        }
                    }
                },
                {
                    key: 'certificate.denominationType',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'denomination',
                        additionalField: 'certificate.openCertificateAmount',
                        value: 'short'
                    }
                },
            ],
            actions: {},
            actionsRender: {}
        });

        this.createModalStore();
        this.fetchDonorData();
        this.fetchChecksOnHold();
    }

    @action.bound
    async fetchDonorData() {
        this.donor = await this.rootStore.application.donor.transactionStore.loadDonorData(this.rootStore.userStore.applicationUser.id);
        this.pendingTransactionTableStore.setData(this.donor.pendingTransactions.sort((a, b) => { return new Date(b.paymentTransaction.dateCreated) - new Date(a.paymentTransaction.dateCreated); }));
        if (!this.pendingTransactionTableStore.dataInitialized) {
            this.pendingTransactionTableStore.dataInitialized = true;
        }
    }

    @action.bound
    async fetchChecksOnHold() {
        const data = await this.rootStore.application.donor.transactionStore.findPendingCheck(
            {
                donorId: this.rootStore.userStore.applicationUser.id,
                embed: 'charity,certificate,certificate.booklet,certificate.denominationType',
                sort: 'dateCreated|desc',
                page: 1,
                rpp: 50
            });
        this.checksOnHoldTableStore.setData(data.item);
        if (!this.checksOnHoldTableStore.dataInitialized) {
            this.checksOnHoldTableStore.dataInitialized = true;
        }
    }

    @action.bound
    onExpandPendingTransactionClick() {
        this.isPendingTransactionVisible = !this.isPendingTransactionVisible;
    }

    @action.bound
    onExpandChecksOnHoldClick() {
        this.isChecksOnHoldVisible = !this.isChecksOnHoldVisible;
    }

    createModalStore() {
        this.previewFeesModal = new ModalParams({});
    }

    openModalStore(item) {
        this.previewFeesModal.open(item);
    }
}

export default TransactionTabViewStore;