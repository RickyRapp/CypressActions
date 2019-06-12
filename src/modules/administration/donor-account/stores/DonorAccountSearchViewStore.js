import { action, observable, computed } from 'mobx';
import { DonorAccountService } from "common/data";
import { getDonorNameDropdown } from 'core/utils';
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';

class DonorAccountSearchViewStore extends BaseViewStore {
    @observable donorAccountDropdownStore = null;

    constructor(rootStore, { donorAccountId = null, onChange }) {
        super(rootStore);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        this.donorAccountDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: false,
                placeholder: 'Select Donor',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { 'id': x.id, 'name': getDonorNameDropdown(x) } });
                },
                onChange: onChange
            }
        );
        this.setDefaultSearch(donorAccountId);
    }

    @action.bound async setDefaultSearch(donorAccountId) {
        if (donorAccountId) {
            let params = {};
            params.embed = ['coreUser,donorAccountAddresses,address'];
            const donorAccount = await this.donorAccountService.get(donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountDropdownStore.items = donorSearchs;
            this.donorAccountDropdownStore._value = donorAccountId;
        }
    }
}

export default DonorAccountSearchViewStore;