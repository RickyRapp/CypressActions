import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonorAccountService } from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { DonorAccountListFilter } from 'application/donor-account/models';

@applicationContext
class DonorAccountViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-account',
            routes: {
                edit: (id) => {
                    this.setChildNavigationTitle(i => i.id === id, item => item.donorName);
                    this.rootStore.routerStore.goTo(
                        'master.app.main.donor-account.edit',
                        { id: id }
                    );
                },
                create: () =>
                    this.rootStore.routerStore.goTo(
                        'master.app.main.donor-account.create'
                    )
            },
            queryConfig: {
                filter: new DonorAccountListFilter()
            },
            actions: () => {
                const service = new DonorAccountService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = ['coreUser', 'companyProfile', 'accountType'];
                        params.fields = [
                            'id',
                            'donorName',
                            'accountNumber',
                            'accountType',
                            'accountType.name',
                            'presentBalance'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donorName',
                    title: 'DONOR_ACCOUNT.LIST.COLUMNS.DONORNAME',
                    onClick: item => this.routes.edit(item.id),
                    authorization: this.authorization.update
                },
                {
                    key: 'accountNumber',
                    title: 'DONOR_ACCOUNT.LIST.COLUMNS.ACCOUNTNUMBER'
                },
                {
                    key: 'accountType.name',
                    title: 'DONOR_ACCOUNT.LIST.COLUMNS.ACCOUNTTYPE'
                },
                {
                    key: 'presentBalance',
                    title: 'DONOR_ACCOUNT.LIST.COLUMNS.PRESENTBALANCE',
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

export default DonorAccountViewStore;
