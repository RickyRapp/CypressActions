import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { CharityService } from 'application/donor/charity/services';
import { CharityListFilter } from 'application/donor/charity/models';
import { action } from 'mobx';

class CharityAdvancedSearchViewStore extends BaseListViewStore {
    constructor(rootStore, onSelected) {
        super(rootStore, {
            name: 'advanced-charity',
            routes: {},
            autoInit: false,
            queryConfig: {
                disableUpdateQueryParams: true,
                filter: new CharityListFilter('dateCreated', 'desc', 10),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.charityTypeDropdownStore.setValue(null);
                    filter.pageSize = 10;
                }
            },
            actions: () => {
                const service = new CharityService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'charityAddresses'
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
            },
            disablePaging: true,
            disableSorting: true
        }));

        this.charityTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.charityTypeStore.find();
                },
                onChange: (charityType) => {
                    this.queryUtility.filter.charityTypeIds = charityType.map((type) => { return type.id });
                }
            });
    }

    @action.bound
    async loadMoreClick() {
        const service = new CharityService(this.rootStore.application.baasic.apiClient);
        await this.tableStore.fetchMore(async (params) => {
            params.embed = [
                'charityAddresses',
                'charityAccountType'
            ];
            const response = await service.search(params);
            return response.data;
        });

        if (this.tableStore.data.length < this.tableStore.pageSize * this.tableStore.pageNumber) {
            this.tableStore.hasRemainingData = false;
        }
    }
}

export default CharityAdvancedSearchViewStore;
