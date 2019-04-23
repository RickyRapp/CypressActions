import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicAsyncDropdown } from 'core/components';
import { BaasicDropdownStore } from "core/stores";
import { DonorAccountService } from "common/data";
import { getDonorNameDropdown } from 'core/utils';
import _ from 'lodash';

function DonorAccountSearchTemplate({ onChange, rootStore }) {
    const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
    const donorDropdownStore = new BaasicDropdownStore(
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

                let response = await donorAccountService.search(options);
                return _.map(response.item, x => { return { 'id': x.id, 'name': getDonorNameDropdown(x) } });
            },
            onChange: onChange
        }
    );

    return (
        <BaasicAsyncDropdown store={donorDropdownStore} />
    );
}

export default defaultTemplate(DonorAccountSearchTemplate);
