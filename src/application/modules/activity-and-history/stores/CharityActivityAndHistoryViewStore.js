import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityService } from 'application/charity/services';
import _ from 'lodash'

@applicationContext
class CharityActivityAndHistoryViewStore extends BaseViewStore {
    id = null;

    constructor(rootStore) {
        super(rootStore);

        if (rootStore.routerStore.routerState.params && rootStore.routerStore.routerState.params.id) {
            this.id = rootStore.routerStore.routerState.params.id;
        }

        const charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'ACTIVITY_AND_HISTORY.LIST.SELECT_CHARITY',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await charityService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        searchQuery: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                            'charityAddresses.address'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.name } });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id) {
                        const params = {
                            embed: [
                                'charityAddresses',
                                'charityAddresses.address'
                            ],
                            fields: [
                                'id',
                                'taxId',
                                'name'
                            ]
                        }
                        const response = await charityService.get(rootStore.routerStore.routerState.queryParams.id, params);
                        return { id: response.data.id, name: response.data.name };
                    }
                    else {
                        return null;
                    }
                }
            });
    }

}

export default CharityActivityAndHistoryViewStore;
