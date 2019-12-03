import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ReconcileService } from 'application/reconcile/services';
import { CheckListFilter } from 'application/reconcile/models';
import { ModalParams } from 'core/models';

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
                    title: 'RECONCILE.LIST.COLUMNS.CHECK_NUMBER_LABEL'
                },
                {
                    key: 'paymentTransaction.amount',
                    title: 'RECONCILE.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'charity.name',
                    title: 'RECONCILE.LIST.COLUMNS.CHARITY_NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'RECONCILE.LIST.COLUMNS.DESCRIPTION_LABEL'
                },
                {
                    key: 'dateCreated',
                    title: 'RECONCILE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (transaction) => this.openEditModal(transaction),
                onPreview: (transaction) => this.openPreviewModal(transaction),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (transaction) => {
                    return !transaction.checkCashed;
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
}

export default CheckViewStore;
