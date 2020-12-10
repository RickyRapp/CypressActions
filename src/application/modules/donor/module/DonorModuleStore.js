import { DonorStore } from 'application/donor/donor/stores';
import { ContributionStore } from 'application/donor/contribution/stores';
import { GrantStore } from 'application/donor/grant/stores/';
import { TransactionStore } from 'application/donor/activity/transaction/stores/';
import { BookletOrderStore } from 'application/donor/booklet-order/stores';
import { CharityStore } from 'application/donor/charity/stores';
import { DashboardStore } from 'application/donor/dashboard/stores';

class DonorModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.donorStore = new DonorStore(this);
        this.contributionStore = new ContributionStore(this);
        this.grantStore = new GrantStore(this);
        this.transactionStore = new TransactionStore(this);
        this.bookletOrderStore = new BookletOrderStore(this);
        this.charityStore = new CharityStore(this);
        this.dashboardStore = new DashboardStore(this);
    }
}
export default DonorModuleStore;
