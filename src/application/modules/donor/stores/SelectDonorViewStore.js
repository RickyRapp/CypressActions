import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorService } from 'application/donor/services';
import { donorFormatter } from 'core/utils';
import _ from 'lodash'

class SelectDonorViewStore extends BaseViewStore {
    constructor(rootStore, { donorId, onClickDonorFromFilter, onChange }) {
        super(rootStore);

        this.donorId = donorId;
        this.onClickDonorFromFilter = onClickDonorFromFilter;

        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.selectDonorDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
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
                onChange: onChange
            });
    }
}

export default SelectDonorViewStore;
