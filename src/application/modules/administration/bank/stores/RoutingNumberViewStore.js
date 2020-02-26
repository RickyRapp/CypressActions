import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { RoutingNumberService, BankService } from 'application/administration/bank/services';
import { RoutingNumberListFilter } from 'application/administration/bank/models';
import { ModalParams } from 'core/models';
import { action } from 'mobx';

class RoutingNumberViewStore extends BaseListViewStore {
    scanners = null;

    constructor(rootStore) {
        const service = new RoutingNumberService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'routing-number',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                create: async () => {
                    this.openCreateModal(undefined);
                }
            },
            queryConfig: {
                filter: new RoutingNumberListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    this.bankDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = ['bank'];
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
                    key: 'bank.name',
                    title: 'ROUTING_NUMBER.LIST.COLUMNS.BANK_LABEL'
                },
                {
                    key: 'region',
                    title: 'ROUTING_NUMBER.LIST.COLUMNS.REGION_LABEL'
                },
                {
                    key: 'number',
                    title: 'ROUTING_NUMBER.LIST.COLUMNS.NUMBER_LABEL',
                    format: {
                        type: 'routing-number'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'ROUTING_NUMBER.LIST.COLUMNS.DATE_CREATED_LABEL',
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

        const bankService = new BankService(rootStore.application.baasic.apiClient);
        this.bankDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await bankService.find({
                        pageNumber: 1,
                        pageSize: 10,
                        searchQuery: searchQuery,
                        sort: 'name|asc',
                        fields: [
                            'id',
                            'name'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: x.name
                        }
                    });
                },
                onChange: (bankId) => {
                    this.queryUtility.filter['bankId'] = bankId;
                }
            });
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
            `Are you sure you want to delete routing number?`,
            async () => {
                await this.service.delete(item);
                this.rootStore.notificationStore.success('Successfully deleted routing number');
                await this.queryUtility.fetch();
            }
        );
    }
}

export default RoutingNumberViewStore;
