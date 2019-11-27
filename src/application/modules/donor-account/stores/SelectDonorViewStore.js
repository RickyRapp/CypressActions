import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorAccountService } from 'application/donor-account/services';
import { donorAccountFormatter } from 'core/utils';
import _ from 'lodash'

class SelectDonorViewStore extends BaseViewStore {
    constructor(rootStore, { donorAccountId, onClickDonorFromFilter, onChange }) {
        super(rootStore);

        this.donorAccountId = donorAccountId;
        this.onClickDonorFromFilter = onClickDonorFromFilter;

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.selectDonorDropdownStore = new BaasicDropdownStore({
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
                            'coreUser',
                            'companyProfile',
                            'donorAccountAddresses',
                            'donorAccountAddresses.address'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAccountAddresses'
                        ]
                    });
                    return _.map(response.item, x => {
                        return {
                            id: x.id,
                            name: donorAccountFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: onChange
            });
    }
}

export default SelectDonorViewStore;
