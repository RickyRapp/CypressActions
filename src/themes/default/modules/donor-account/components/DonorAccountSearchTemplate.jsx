import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicAsyncDropdown, BaasicModal } from 'core/components';
import { BaasicDropdownStore } from "core/stores";
import { DonorAccountService } from "common/data";
import _ from 'lodash';

function DonorAccountSearchTemplate(props) {
    const { modalParams, onChange, rootStore } = props;
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
                return _.map(response.item, x => { return { 'id': x.id, 'name': getName(x) } });
            },
            onChange: onChange
        }
    );

    return (
        <BaasicModal modalParams={modalParams} >
            <div className="col col-sml-12 card card--form card--primary card--lrg">
                <div className="f-row">
                    <div className="form__group f-col f-col-lrg-12">
                        <span>Please select donor</span>
                        <BaasicAsyncDropdown store={donorDropdownStore} />
                    </div>
                </div>
            </div>
        </BaasicModal>
    );
}


function getName(val) {
    let fullName = `${val.coreUser.firstName}`
    if (val.coreUser.json && JSON.parse(val.coreUser.json).middleName) {
        fullName += ` (${JSON.parse(val.coreUser.json).middleName})`
    }
    fullName += ` ${val.coreUser.lastName}`;

    if (val.donorAccountAddresses) {
        var primaryAddress = _.find(val.donorAccountAddresses, { primary: true }).address;
        if (primaryAddress) {
            fullName += ` - ${primaryAddress.addressLine1}`
            if (primaryAddress.addressLine2) {
                fullName += ` ${primaryAddress.addressLine2}`
            }
            fullName += `, ${primaryAddress.city}, ${primaryAddress.state} ${primaryAddress.zipCode}`
        }
    }
    return fullName;
}


export default defaultTemplate(DonorAccountSearchTemplate);
