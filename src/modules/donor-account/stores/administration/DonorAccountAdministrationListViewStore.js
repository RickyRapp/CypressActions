import { BaseListViewStore, TableViewStore } from "core/stores";
import { DonorAccountService } from "common/data";
import { DonorAccountAdministrationListFilter } from 'modules/donor-account/models';

class DonorAccountAdministrationListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donorAccount',
            routes: {
                edit: id => this.rootStore.routerStore.navigate('master.app.administration.donor.account.edit', {
                    id: id
                }),
                create: () => this.rootStore.routerStore.navigate('master.app.membership.register')
            },
            actions: {
                find: async params => {
                    params.embed = 'coreUser';
                    const response = await donorAccountService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: new DonorAccountAdministrationListFilter()
            }
        })

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'coreUser.firstName',
                        title: 'First Name',
                        onClick: donorAccount => this.routes.edit(donorAccount.id)
                    },
                    {
                        key: 'coreUser.lastName',
                        title: 'Last Name'
                    },
                    {
                        key: 'accountNumber',
                        title: 'Account Number'
                    },
                    {
                        key: 'availableBalance',
                        title: 'Available Balance',
                        type: 'currency',
                        format: 'US'
                    }
                ],
                actions: {
                    onEdit: donorAccount => this.routes.edit(donorAccount.id)
                }
            })
        );
    }
}

export default DonorAccountAdministrationListViewStore;