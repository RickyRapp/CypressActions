import { TableViewStore, BaseListViewStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { applicationContext } from 'core/utils';
import { CharityGrantsListFilter } from 'application/charity/models';

@applicationContext
class CharityGrantsViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const service = new CharityService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'charity-grants',
            routes: {},
            queryConfig: {
                filter: new CharityGrantsListFilter()
            },
            actions: () => {
                return {
                    find: async (params) => {
                        const response = await service.findGrants(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donorName',
                    title: 'CHARITY_GRANTS.LIST.COLUMNS.DONOR_LABEL',
                },
                {
                    key: 'amount',
                    title: 'CHARITY_GRANTS.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'CHARITY_GRANTS.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                },
                {
                    key: 'grantPurposeType.name',
                    title: 'CHARITY_GRANTS.LIST.COLUMNS.GRANT_PURPOSE_TYPE_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'CHARITY_GRANTS.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default CharityGrantsViewStore;
