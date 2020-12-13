import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import _ from 'lodash'

class SelectDonorViewStore extends BaseViewStore {
    constructor(rootStore, { donorId, onClickDonorFromFilter, onChange }) {
        super(rootStore);

        this.donorId = donorId;
        this.onClickDonorFromFilter = onClickDonorFromFilter;

        this.selectDonorDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await rootStore.application.administration.donorStore.searchDonor({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'firstName|asc',
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
                    return _.map(data.item, x => {
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
