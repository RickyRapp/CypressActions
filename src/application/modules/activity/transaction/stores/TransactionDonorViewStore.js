import { ModalParams } from 'core/models';
import { BaseViewStore, TableViewStore } from 'core/stores';
import { isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { action, observable } from 'mobx';

class TransactionTabViewStore extends BaseViewStore {
    @observable donor = null;
    @observable isPendingTransactionVisible = null;

    constructor(rootStore) {
        super(rootStore);
        this.pendingTransactionTableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'paymentTransaction.dateCreated',
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

        this.createModalStore();
        this.fetchDonorData();
    }

    @action.bound
    async fetchDonorData() {
        this.donor = await this.rootStore.application.activity.activityStore.loadDonorData(this.rootStore.userStore.applicationUser.id);
        this.pendingTransactionTableStore.setData(this.donor.pendingTransactions.sort((a, b) => { return new Date(b.paymentTransaction.dateCreated) - new Date(a.paymentTransaction.dateCreated); }));
        if (!this.pendingTransactionTableStore.dataInitialized) {
            this.pendingTransactionTableStore.dataInitialized = true;
        }
    }

    @action.bound
    onExpandPendingTransactionClick() {
        this.isPendingTransactionVisible = !this.isPendingTransactionVisible;
    }

    createModalStore() {
        this.previewFeesModal = new ModalParams({});
    }

    openModalStore(item) {
        this.previewFeesModal.open(item);
    }
}

export default TransactionTabViewStore;