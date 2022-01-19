import { BaasicDropdownStore, BaseViewStore } from 'core/stores';
import { donorFormatter } from 'core/utils';
import { action, observable } from 'mobx';
import { DepositInfoService } from 'application/administration/depositinfo/services';
import { saveAs } from '@progress/kendo-file-saver';

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
                }
            });
    }

    @action.bound
    async generateAnnualReport(donorId) {
        try {
        const service = new DepositInfoService(this.rootStore.application.baasic.apiClient);
        let contentType = 'application/pdf';
        const report = (await service.generateReport({contentType, id: donorId, year: new Date().getFullYear() - 1}));
        let extension = 'pdf';
        const fileName = `AnnualReceipt_${this.searchDonorDropdownStore.value.name.split(',')[0]}_${new Date().getFullYear() - 1}.${extension}`;
        saveAs(report.data, fileName);
        this.rootStore.notificationStore.success("Report generated.");
        } catch (error) {
            this.rootStore.notificationStore.success("There were no deposits processed in the past year.");
        }
        
    }
}

export default AnnualReceiptViewStore;
