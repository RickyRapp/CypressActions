//import { BaseEditViewStore, BaasicDropdownStore, BaseViewStore } from 'core/stores';
import { AdministrationService } from 'application/administration/test/services';
//import { action, observable } from 'mobx';
import { APITestingForm } from 'application/administration/test/forms';
import { BaasicDropdownStore, BaseViewStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import { action, observable } from 'mobx';
//import moment from 'moment';

class AnnualReceiptViewStore extends BaseViewStore {
    @observable donorId = null;

    constructor(rootStore) {
       
        super(rootStore, {
            name: 'annual-receipts'
        });
        this.createSearchDonorDropdownStore();
    }
    createSearchDonorDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.donorStore.searchDonor({
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
                            'donorAddresses',
                        ]
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: (donorId) => {
                    this.donorId = donorId;
                    console.log(this.searchDonorDropdownStore);
                }
            });
    }

    @action.bound
    generateAnnualReport(donorId) {
        console.log(donorId);
    }

}

export default AnnualReceiptViewStore;
