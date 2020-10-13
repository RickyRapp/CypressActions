import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonorService } from 'application/donor/services';
import { applicationContext } from 'core/utils';
import { LookupService } from 'common/services';
import { DonorListFilter } from 'application/donor/models';

@applicationContext
class DonorViewStore extends BaseListViewStore {
    @observable accountTypes = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'donor',
            routes: {
                edit: (id) => {
                    this.setChildNavigationTitle(i => i.id === id, item => item.donorName);
                    this.rootStore.routerStore.goTo(
                        'master.app.main.donor.edit',
                        { id: id }
                    );
                },
                create: () =>
                    this.rootStore.routerStore.goTo(
                        'master.app.main.donor.create'
                    )
            },
            queryConfig: {
                filter: new DonorListFilter('dateCreated', 'desc')
            },
            actions: () => {
                const service = new DonorService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = ['accountType'];
                        params.fields = [
                            'id',
                            'donorName',
                            'firstName',
                            'lastName',
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
                    title: 'DONOR.LIST.COLUMNS.DONOR_NAME',
                    onClick: item => this.routes.edit(item.id),
                    authorization: this.authorization.update
                },
                {
                    key: 'accountNumber',
                    title: 'DONOR.LIST.COLUMNS.ACCOUNT_NUMBER'
                },
                {
                    key: 'accountType.name',
                    title: 'DONOR.LIST.COLUMNS.ACCOUNT_TYPE'
                },
                {
                    key: 'presentBalance',
                    title: 'DONOR.LIST.COLUMNS.PRESENT_BALANCE',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
                onEdit: (donor) => this.routes.edit(donor.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.donor.list'
            )
        }
        else {
            await this.fetch([
                this.fetchAccountTypes()
            ]);
        }
    }

    @action.bound
    async fetchAccountTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'account-type');
        const response = await service.getAll();
        this.accountTypes = response.data;
    }
}

export default DonorViewStore;
