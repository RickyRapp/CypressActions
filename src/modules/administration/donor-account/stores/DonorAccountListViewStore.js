import { BaseListViewStore, TableViewStore } from "core/stores";
import { DonorAccountService } from "common/data";
import { DonorAccountListFilter } from 'modules/administration/donor-account/models';

class DonorAccountListViewStore extends BaseListViewStore {
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
                    const response = await donorAccountService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: new DonorAccountListFilter()
            }
        })

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'fullName',
                        title: 'Name',
                        onClick: donorAccount => this.routes.edit(donorAccount.id)
                    },
                    {
                        key: 'accountNumber',
                        title: 'Account Number'
                    },
                    {
                        key: 'availableBalance',
                        title: 'Available Balance',
                        type: 'currency'
                    }
                ],
                actions: {
                    onEdit: donorAccount => this.routes.edit(donorAccount.id)
                }
            })
        );
    }
}

export default DonorAccountListViewStore;