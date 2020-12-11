import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { CharityListFilter } from 'application/administration/charity/models';
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
                return {
                    find: async (params) => {
                        params.embed = [
                            'charityAddresses'
                        ];
                        return this.rootStore.application.administration.charityStore.searchCharity(params);
                    }
                }
            }
        });

        this.createTableStore(onSelected);
        this.createCharityTypeDropdownStore();
    }

    @action.bound
    async loadMoreClick() {
        await this.tableStore.fetchMore(async (params) => {
            params.embed = [
                'charityAddresses',
            ];
            return this.rootStore.application.administration.charityStore.searchCharity(params);
        });

        if (this.tableStore.data.length < this.tableStore.pageSize * this.tableStore.pageNumber) {
            this.tableStore.hasRemainingData = false;
        }
    }

    createTableStore(onSelected) {
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
    }

    createCharityTypeDropdownStore() {
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
}

export default CharityAdvancedSearchViewStore;
