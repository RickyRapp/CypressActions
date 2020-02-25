import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { CharityListFilter } from 'application/charity/models';
import { LookupService } from 'common/services';

class CharityAdvancedSearchViewStore extends BaseListViewStore {
    constructor(rootStore, onSelected) {
        super(rootStore, {
            name: 'advanced-charity',
            routes: {},
            queryConfig: {
                disableUpdateQueryParams: true,
                filter: new CharityListFilter('dateCreated', 'desc', 5),
                onResetFilter: (filter) => {
                    filter.pageSize = 5;
                }
            },
            actions: () => {
                const service = new CharityService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'charityAddresses',
                            'charityAccountType'
                        ];
                        const response = await service.search(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'name',
                    title: 'CHARITY.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'taxId',
                    title: 'CHARITY.LIST.COLUMNS.TAX_ID_LABEL',
                    format: {
                        type: 'charity',
                        value: 'tax-id'
                    }
                },
                {
                    key: 'charityAddresses',
                    title: 'CHARITY.LIST.COLUMNS.ADDRESS_LABEL',
                    format: {
                        type: 'address',
                        value: 'full'
                    }
                }
            ],
            actions: {
                onSelect: (item) => onSelected(item),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));

        this.charityTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-type');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (charityType) => {
                    this.queryUtility.filter['charityTypeIds'] = _.map(charityType, (type) => { return type.id });
                }
            });
    }
}

export default CharityAdvancedSearchViewStore;
