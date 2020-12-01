import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ReconcileService } from 'application/administration/reconcile/services';
import { ReconcileListFilter } from 'application/administration/reconcile/models';
import { ModalParams } from 'core/models';
import { isSome } from 'core/utils';
import { TransactionEditForm } from '../forms';

class ReconcileViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
            },
            queryConfig: {
                filter: new ReconcileListFilter('dateCreated', 'desc')
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

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'paymentNumber',
                    title: 'RECONCILE.LIST.COLUMNS.PAYMENT_NUMBER_LABEL'
                },
                {
                    key: 'paymentType.name',
                    title: 'RECONCILE.LIST.COLUMNS.PAYMENT_TYPE_LABEL'
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
                        value: 'full'
                    }
                }
            ],
            actions: {
                onEdit: (item) => this.openEditModal(item),
                onCash: (item) => this.cashConfirm(item),
                onPreview: (item) => this.openPreviewModal(item),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (item) => {
                    return !item.isCashed && item.paymentType.abrv === 'check';
                },
                onCashRender: (item) => {
                    return !isSome(item.isCashed);
                },
                onPreviewRender: (item) => {
                    return item.isCashed && item.json;
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
                form.$('isCashed').set(true);
                const service = new ReconcileService(this.rootStore.application.baasic.apiClient);
                await service.checkUpdate({ id: transaction.id, ...form.values() });
                await this.queryUtility.fetch();
                this.rootStore.notificationStore.success('Successfully cashed transaction');
            }
        );
    }
}

export default ReconcileViewStore;
