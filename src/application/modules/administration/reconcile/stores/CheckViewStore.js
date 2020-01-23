import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ReconcileService } from 'application/administration/reconcile/services';
import { CheckListFilter } from 'application/administration/reconcile/models';
import { ModalParams } from 'core/models';
import { isSome } from 'core/utils';
import { TransactionEditForm } from '../forms';

class CheckViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
            },
            queryConfig: {
                filter: new CheckListFilter('dateCreated', 'desc')
            },
            actions: () => {
                const service = new ReconcileService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'paymentTransaction',
                            'paymentType'
                        ]
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.rootStore = rootStore;

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'paymentNumber',
                    title: 'RECONCILE.CHECK.LIST.COLUMNS.CHECK_NUMBER_LABEL'
                },
                {
                    key: 'paymentTransaction.amount',
                    title: 'RECONCILE.CHECK.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'charity.name',
                    title: 'RECONCILE.CHECK.LIST.COLUMNS.CHARITY_NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'RECONCILE.CHECK.LIST.COLUMNS.DESCRIPTION_LABEL'
                },
                {
                    key: 'dateCreated',
                    title: 'RECONCILE.CHECK.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (transaction) => this.openEditModal(transaction),
                onCash: (transaction) => this.cashConfirm(transaction),
                onPreview: (transaction) => this.openPreviewModal(transaction),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (transaction) => {
                    return !transaction.checkCashed;
                },
                onCashRender: (transaction) => {
                    return !isSome(transaction.checkCashed);
                },
                onPreviewRender: (transaction) => {
                    return transaction.checkCashed && transaction.json;
                }
            }
        }));

        this.editModal = new ModalParams({});
        this.previewModal = new ModalParams({});
    }

    @action.bound
    openEditModal(transaction) {
        this.editModal.open({
            transaction: transaction,
            onAfterEdit: () => { this.editModal.close(); this.queryUtility.fetch() }
        });
    }

    @action.bound
    openPreviewModal(transaction) {
        this.previewModal.open({
            transaction: transaction
        });
    }

    @action.bound
    async cashConfirm(transaction) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to mark transaction as cashed?`,
            async () => {
                let form = new TransactionEditForm();
                form.$('checkCashed').set(true);
                const service = new ReconcileService(this.rootStore.application.baasic.apiClient);
                await service.checkUpdate({ id: transaction.id, ...form.values() });
                await this.queryUtility.fetch();
                this.rootStore.notificationStore.success('Successfully cashed transaction');
            }
        );
    }
}

export default CheckViewStore;
