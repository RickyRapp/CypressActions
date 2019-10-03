import { action, observable, computed } from 'mobx';
import { DonorAccountService } from "common/data";
import { getDonorNameDropdown, getDonorAccountDropdownOptions } from 'core/utils';
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';

class DonorAccountSearchViewStore extends BaseViewStore {
    @observable donorAccountDropdownStore = null;

    constructor(rootStore, { donorAccountId = null, onChange }) {
        super(rootStore);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        this.donorAccountDropdownStore = new BaasicDropdownStore(
            {
                textField: 'name',
                dataItemKey: 'id',
                placeholder: 'Select Donor'
            },
            {
                fetchFunc: async (term) => {
                    let options = getDonorAccountDropdownOptions;

                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: onChange
            }
        );
        this.setDefaultSearch(donorAccountId);
    }

    @action.bound async setDefaultSearch(donorAccountId) {
        if (donorAccountId) {
            let donorSearchs = [];
            const params = getDonorAccountDropdownOptions;
            const donorAccount = await this.donorAccountService.get(donorAccountId, params);
            donorSearchs.push({ id: donorAccount.id, name: getDonorNameDropdown(donorAccount) });
            this.donorAccountDropdownStore.setItems(donorSearchs);
            this.donorAccountDropdownStore.setValue(donorAccountId);
        }
    }
}

export default DonorAccountSearchViewStore;