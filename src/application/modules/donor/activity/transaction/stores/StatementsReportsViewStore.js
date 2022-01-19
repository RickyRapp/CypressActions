import { BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';
import { DepositInfoService } from 'application/donor/depositinfo/services';
import { saveAs } from '@progress/kendo-file-saver';

@applicationContext
class StatementsReportsViewStore extends BaseListViewStore {
    constructor(rootStore) {

        super(rootStore, {
            name: 'statements-reports',
            routes: {},
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'paymentTransaction',
                        ]
                        //return this.rootStore.application.donor.transactionStore.findTransactions({ donorId: this.donorId, ...params });
                        return [{year: 2019}, {year: 2020}, {year: 2021}];
                    }
                }
            }
        });
        this.createYearDropdownStore();

        this.donorId = rootStore.userStore.applicationUser.id;  
        
    }

    createYearDropdownStore() {
        this.yearDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.resume();
            const minYear = parseInt(localStorage.getItem('minYear'));
            let years = [];
            for (let yr = minYear; yr < new Date().getFullYear(); yr++) {
                years.push({name: yr.toString(), id: yr});
            }

            this.yearDropdownStore.setItems(years);
            this.yearDropdownStore.setValue({name: (new Date().getFullYear() - 1).toString(), id: new Date().getFullYear() - 1});
        }
    }
    
    @action.bound
    async onPrintReport() {
        try {
        const service = new DepositInfoService(this.rootStore.application.baasic.apiClient);
        let contentType = 'application/pdf';
        const report = (await service.generateReport({contentType, id: this.donorId, year: this.yearDropdownStore.value.id}));
        let extension = 'pdf';
        const fileName = `AnnualReceipt_${this.yearDropdownStore.value.id}.${extension}`;
        saveAs(report.data, fileName);
        this.rootStore.notificationStore.success("Report generated.");
        } catch (error) {
            this.rootStore.notificationStore.success("There were no deposits processed in the selected year.");
        }
        
    }

}

export default StatementsReportsViewStore;
