import { TableViewStore, BaseListViewStore } from 'core/stores';
import { BankService } from 'application/administration/bank/services';
import { BankListFilter } from 'application/administration/bank/models';
import { ModalParams } from 'core/models';
import { action } from 'mobx';

class BankViewStore extends BaseListViewStore {
    scanners = null;

    constructor(rootStore) {
        const service = new BankService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'bank',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                create: async () => {
                    this.openCreateModal(undefined);
                }
            },
            queryConfig: {
                filter: new BankListFilter('name', 'desc')
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = ['routingNumbers'];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.service = service;

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'name',
                    title: 'BANK.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'BANK.LIST.COLUMNS.DESCRIPTION_LABEL'
                },
                {
                    key: 'routingNumbers',
                    title: 'BANK.LIST.COLUMNS.ROUTING_NUMBERS_COUNT_LABEL',
                    format: {
                        type: 'count'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'BANK.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (item) => this.openCreateModal(item.id),
                onDelete: (item) => this.delete(item),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {}
        }));

        this.createModal = new ModalParams({});
    }

    @action.bound
    openCreateModal(id) {
        this.createModal.open({
            id: id,
            onAfterAction: () => {
                this.queryUtility.fetch();
                this.createModal.close();
            }
        });
    }

    @action.bound
    async delete(item) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete bank${item.routingNumbers.length > 0 ? ' and ' + item.routingNumbers.length + ' routing number/s' : ''}?`,
            async () => {
                await this.service.delete(item);
                this.rootStore.notificationStore.success('Successfully deleted bank');
                await this.queryUtility.fetch();
            }
        );
    }
}

export default BankViewStore;
