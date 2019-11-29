import { TableViewStore, BaseListViewStore } from 'core/stores';
import { CheckService } from 'application/reconcile/services';
import { CheckListFilter } from 'application/reconcile/models';

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
                const service = new CheckService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'paymentTransaction'
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
                    title: 'CHECK.LIST.COLUMNS.CHECK_NUMBER_LABEL'
                },
                {
                    key: 'paymentTransaction.amount',
                    title: 'CHECK.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'charity.name',
                    title: 'CHECK.LIST.COLUMNS.CHARITY_NAME_LABEL'
                },
                {
                    key: 'dateCreated',
                    title: 'CHECK.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
            }
        }));
    }
}

export default CheckViewStore;
