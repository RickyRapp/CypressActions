import { action, observable } from 'mobx';
import { BaseListViewStore, TableViewStore } from "core/stores";
import { DonorAccountService, LookupService } from "common/data";
import { DonorAccountListFilter } from 'modules/administration/donor-account/models';

class DonorAccountListViewStore extends BaseListViewStore {
    @observable accountTypes = null;

    fields = [
        'id',
        'donorName',
        'accountNumber',
        'accountTypeId',
        'availableBalance'
    ];

    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donorAccount',
            routes: {
                edit: id => this.rootStore.routerStore.navigate('master.app.administration.donor-account.edit', {
                    userId: id
                }),
                create: () => this.rootStore.routerStore.navigate('master.app.administration.donor-account.create')
            },
            actions: {
                find: async params => {
                    params.embed = 'coreUser,companyProfile';
                    params.fields = this.fields;
                    const response = await donorAccountService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: new DonorAccountListFilter()
            }
        })

        this.accountTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'account-type');
        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'donorName',
                        title: 'Name',
                        onClick: donorAccount => this.routes.edit(donorAccount.id)
                    },
                    {
                        key: 'accountNumber',
                        title: 'Account Number'
                    },
                    {
                        key: 'accountTypeId',
                        title: 'Account Type',
                        type: 'function',
                        function: item => _.find(this.accountTypes, { id: item.accountTypeId }).name
                    },
                    {
                        key: 'availableBalance',
                        title: 'Available Balance',
                        type: 'currency'
                    }
                ],
                actions: {
                    onEdit: donorAccount => this.routes.edit(donorAccount.id)
                },
            })
        );
    }

    @action.bound async loadLookups() {
        let accountTypeModels = await this.accountTypeLookup.getAll();
        this.accountTypes = _.orderBy(accountTypeModels.data, ['sortOrder'], ['asc']);
    }
}

export default DonorAccountListViewStore;