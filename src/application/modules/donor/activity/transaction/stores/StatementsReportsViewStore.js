import { BaseListViewStore, DateRangeQueryPickerStore, BaasicDropdownStore, TableViewStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { TransactionListFilter } from 'application/donor/activity/transaction/models';
import { action } from 'mobx';
import _ from 'lodash';
import moment from 'moment';

@applicationContext
class StatementsReportsViewStore extends BaseListViewStore {
    constructor(rootStore, props) {
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
            

        this.donorId = rootStore.userStore.applicationUser.id;
        
        
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.resume();
        }
        console.log(this);
    }
    

}

export default StatementsReportsViewStore;
