import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext, donorFormatter } from 'core/utils';
import { DonorService } from 'application/donor/services';
import _ from 'lodash'

@applicationContext
class DonorActivityAndHistoryViewStore extends BaseViewStore {
    id = null;

    constructor(rootStore) {
        super(rootStore);

        if (rootStore.routerStore.routerState.params && rootStore.routerStore.routerState.params.id) {
            this.id = rootStore.routerStore.routerState.params.id;
        }

        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.donorDropdownStore = new BaasicDropdownStore({
            placeholder: 'ACTIVITY_AND_HISTORY.LIST.SELECT_DONOR',
            initFetch: false,
            filterable: true,
            clearable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id) {
                        const id = rootStore.routerStore.routerState.queryParams.id;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'securityPin',
                                'donorAddresses'
                            ]
                        }
                        const response = await donorService.get(id, params);
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
