import { BaseViewStore, TableViewStore } from 'core/stores';
import { action, observable } from 'mobx';
import { ActivityService } from 'application/activity/services';

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
            actions: {}
        });
    }

    @action.bound async fetchDonorData(id) {
        const service = new ActivityService(this.rootStore.application.baasic.apiClient);
        const response = await service.loadDonorData(id);
        this.donor = response.data;
        this.pendingTransactionTableStore.setData(this.donor.pendingTransactions)
    }

    @action.bound onExpandPendingTransactionClick() {
        this.isPendingTransactionVisible = !this.isPendingTransactionVisible;
    }
}

export default TransactionTabViewStore;