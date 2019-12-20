import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { DonorAccountService } from 'application/donor-account/services';
import _ from 'lodash'

@applicationContext
class DonorActivityAndHistoryViewStore extends BaseViewStore {
    id = null;

    constructor(rootStore) {
        super(rootStore);

        if (rootStore.routerStore.routerState.params && rootStore.routerStore.routerState.params.id) {
            this.id = rootStore.routerStore.routerState.params.id;
        }

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.donorAccountDropdownStore = new BaasicDropdownStore({
            placeholder: 'ACTIVITY_AND_HISTORY.LIST.SELECT_DONOR',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorAccountService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'donorAccountAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.donorName } });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id) {
                        const params = {
                            embed: [
                                'donorAccountAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName'
                            ]
                        }
                        const response = await donorAccountService.get(rootStore.routerStore.routerState.queryParams.id, params);
                        return { id: response.data.id, name: response.data.donorName };
                    }
                    else {
                        return null;
                    }
                }
            });
    }

}

export default DonorActivityAndHistoryViewStore;
