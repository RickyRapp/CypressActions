import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext, donorAccountFormatter } from 'core/utils';
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
            filterable: true,
            clearable: true
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
                            'donorName',
                            'securityPin',
                            'donorAccountAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorAccountFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id) {
                        const id = rootStore.routerStore.routerState.queryParams.id;
                        const params = {
                            embed: [
                                'donorAccountAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'securityPin',
                                'donorAccountAddresses'
                            ]
                        }
                        const response = await donorAccountService.get(id, params);
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
