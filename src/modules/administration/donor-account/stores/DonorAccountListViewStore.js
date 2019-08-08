import { observable } from 'mobx';
import { BaseListViewStore, TableViewStore } from "core/stores";
import { DonorAccountService } from "common/data";
import { DonorAccountListFilter } from 'modules/administration/donor-account/models';

class DonorAccountListViewStore extends BaseListViewStore {
    @observable accountTypes = null;

    fields = [
        'id',
        'donorName',
        'accountNumber',
        'accountType',
        'accountType.name',
        'availableBalance',
        'presentBalance'
    ];

    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        let filter = new DonorAccountListFilter();
        filter.orderBy = 'dateCreated';
        filter.orderDirection = 'desc';

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
                    params.embed = ['coreUser', 'companyProfile', 'accountType'];
                    params.fields = this.fields;
                    const response = await donorAccountService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        })

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'donorName',
                        title: 'DONOR',
                        onClick: donorAccount => this.routes.edit(donorAccount.id)
                    },
                    {
                        key: 'accountNumber',
                        title: 'ACCOUNTNUMBER'
                    },
                    {
                        key: 'accountType.name',
                        title: 'ACCOUNTTYPE'
                    },
                    {
                        key: 'presentBalance',
                        title: 'PRESENTBALANCE',
                        type: 'currency'
                    },
                    {
                        key: 'availableBalance',
                        title: 'AVAILABLEBALANCE',
                        type: 'currency'
                    }
                ],
                actions: {
                    onEdit: item => this.routes.edit(item.id)
                },
                actionsRender: {}
            })
        );
    }
}

export default DonorAccountListViewStore;