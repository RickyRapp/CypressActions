import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityListFilter } from 'application/administration/charity/models';

@applicationContext
class CharityViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'charity',
            routes: {
                edit: (id) => {
                    this.setChildNavigationTitle(i => i.id === id, item => item.name);
                    this.rootStore.routerStore.goTo('master.app.main.charity.edit', { id: id });
                },
                create: () =>
                    this.rootStore.routerStore.goTo('master.app.main.charity.create')
            },
            queryConfig: {
                filter: new CharityListFilter('dateCreated', 'desc')
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [];
                        params.fields = ['id', 'name', 'taxId', 'dateCreated', 'availableBalance'];
                        return rootStore.application.administration.charityStore.findCharity(params);
                    }
                }
            }
        });

        this.createTableStore();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'name',
                    title: 'CHARITY.LIST.COLUMNS.NAME_LABEL',
                    onClick: item => this.routes.edit(item.id),
                    authorization: this.authorization.update
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
                    key: 'dateCreated',
                    title: 'CHARITY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'availableBalance',
                    title: 'CHARITY.LIST.COLUMNS.BALANCE_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
                onEdit: (item) => this.routes.edit(item.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default CharityViewStore;
