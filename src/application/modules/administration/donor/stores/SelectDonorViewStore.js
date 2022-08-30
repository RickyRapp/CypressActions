import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { charityFormatter, donorFormatter } from 'core/utils';
import _ from 'lodash'
import { action, observable } from 'mobx';

class SelectDonorViewStore extends BaseViewStore {
    @observable isCharity = true;
    constructor(rootStore, { donorId, onClickDonorFromFilter,onClickCharityFromFilter, onChange, displayToggle,charityId }) {
        super(rootStore);
        this.displayToggle = displayToggle;
        this.donorId = donorId;
        this.charityId = charityId;
        this.onClickDonorFromFilter = onClickDonorFromFilter;
        this.onClickCharityFromFilter = onClickCharityFromFilter;
        if(this.donorId == null && this.charityId == null){
            this.isCharity = false;
        }
        else if(this.donorId != null){
            this.isCharity = false;
        }
        else{
            this.isCharity = true;
        }
        this.searchCharityDropdownStore = new BaasicDropdownStore({
            placeholder: 'SESSION.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.charityStore.searchCharity({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses'
                        ],
                        fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary']
                    });
                    return data.item.map(x => { return { id: x.id, name: charityFormatter.format(x, { value: 'charity-name-display' }) } });
                },
                onChange: onChange
            });

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
    @action.bound
    setCharityToggle() {
      this.isCharity = !this.isCharity;
    }
}

export default SelectDonorViewStore;
