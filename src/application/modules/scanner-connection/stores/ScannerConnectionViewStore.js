import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ScannerConnectionService } from 'application/scanner-connection/services';
import { applicationContext } from 'core/utils';
import { ScannerConnectionListFilter } from 'application/scanner-connection/models';

@applicationContext
class ScannerConnectionViewStore extends BaseListViewStore {
    constructor(rootStore) {
        let filter = new ScannerConnectionListFilter('dateCreated', 'desc')

        super(rootStore, {
            name: 'scanner',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
            },
            queryConfig: {
                filter: filter
            },
            actions: () => {
                const service = new ScannerConnectionService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'scanner',
                            'coreUser'
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
                    key: 'coreUser.firstName',
                    title: 'SCANNER_CONNECTION.LIST.COLUMNS.USER_NAME_LABEL',
                },
                {
                    key: 'scanner.name',
                    title: 'SCANNER_CONNECTION.LIST.COLUMNS.SCANNER_NAME_LABEL'
                },
                {
                    key: 'connectionId',
                    title: 'SCANNER_CONNECTION.LIST.COLUMNS.CONNECTION_ID_LABEL'
                },
                {
                    key: 'isActive',
                    title: 'SCANNER_CONNECTION.LIST.COLUMNS.IS_ACTIVE_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'dateUpdated',
                    title: 'SCANNER_CONNECTION.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'full'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default ScannerConnectionViewStore;
