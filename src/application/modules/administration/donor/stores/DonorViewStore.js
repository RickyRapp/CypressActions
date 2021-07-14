import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { DonorListFilter } from 'application/administration/donor/models';

@applicationContext
class DonorViewStore extends BaseListViewStore {
    @observable accountTypes = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'donor',
            routes: {
                edit: (id) => {
                    this.setChildNavigationTitle(i => i.id === id, item => item.donorName);
                    this.rootStore.routerStore.goTo('master.app.main.administration.donor.edit', { id: id });
                },
                create: () => {
                    this.rootStore.routerStore.goTo('master.app.main.donor.create')
                }
            },
            queryConfig: {
                filter: new DonorListFilter('dateCreated', 'desc')
            },
            actions: () => {
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
                            'presentBalance',
                            'pin',
                            'phone',
                            'address'
                        ];
                        return this.rootStore.application.administration.donorStore.findDonors(params);
                    }
                }
            }
        });

        this.createTableStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.loadLookups()
            ]);
        }
    }

    async loadLookups() {
        this.accountTypes = await this.rootStore.application.lookup.accountTypeStore.find();
    }

    createTableStore() {
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
}

export default DonorViewStore;
