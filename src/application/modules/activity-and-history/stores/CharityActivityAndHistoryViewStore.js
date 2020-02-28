import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext, charityFormatter } from 'core/utils';
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
            filterable: true,
            clearable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await charityService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                            'charityAccountType'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name',
                            'charityAccountType',
                            'charityAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' }),
                            item: x
                        }
                    });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id) {
                        const params = {
                            embed: [
                                'charityAddresses',
                                'charityAccountType'
                            ],
                            fields: [
                                'id',
                                'taxId',
                                'name',
                                'charityAccountType',
                                'charityAddresses'
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
