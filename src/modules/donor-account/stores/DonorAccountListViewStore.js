import { BaseListViewStore, TableViewStore } from "core/stores";
import { DonorAccountService } from "common/data";

class DonorAccountListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donorAccount',
            routes: {
                edit: id => this.rootStore.routerStore.navigate('master.app.main.donor-account.edit', {
                    id: id
                })
            },
            actions: {
                find: async params => {
                    params.embed = 'coreUser';
                    const response = await donorAccountService.find(params);
                    return response;
                }
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