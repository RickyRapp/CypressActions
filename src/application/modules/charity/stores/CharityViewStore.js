import { TableViewStore, BaseListViewStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { applicationContext } from 'core/utils';
import { CharityListFilter } from 'application/charity/models';

@applicationContext
class CharityViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'charity',
            routes: {
                edit: (id) => {
                    this.setChildNavigationTitle(i => i.id === id, item => item.name);
                    this.rootStore.routerStore.goTo(
                        'master.app.main.charity.edit',
                        { id: id }
                    );
                },
                create: () =>
                    this.rootStore.routerStore.goTo(
                        'master.app.main.charity.create'
                    )
            },
            queryConfig: {
                filter: new CharityListFilter('dateCreated', 'desc')
            },
            actions: () => {
                const service = new CharityService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [];
                        params.fields = [];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

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
                    key: 'balance',
                    title: 'CHARITY.LIST.COLUMNS.BALANCE_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
                onEdit: (user) => this.routes.edit(user.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default CharityViewStore;
