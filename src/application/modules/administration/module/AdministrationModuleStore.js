import { DashboardStore } from 'application/administration/dashboard/stores';
import { DonorStore } from 'application/administration/donor/stores';
import { ContributionStore } from 'application/administration/contribution/stores';
import { GrantStore } from 'application/administration/grant/stores';
import { CharityStore } from 'application/administration/charity/stores';
import { EmailStore } from 'application/administration/email/stores';
import { BookletOrderStore } from 'application/administration/booklet-order/stores';
import { BookletStore } from 'application/administration/booklet/stores';
import { SessionStore } from 'application/administration/session/stores';

class AdministrationModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.dashboardStore = new DashboardStore(this);
        this.donorStore = new DonorStore(this);
        this.contributionStore = new ContributionStore(this);
        this.grantStore = new GrantStore(this);
        this.charityStore = new CharityStore(this);
        this.emailStore = new EmailStore(this);
        this.bookletOrderStore = new BookletOrderStore(this);
        this.bookletStore = new BookletStore(this);
        this.sessionStore = new SessionStore(this);
    }
}
export default AdministrationModuleStore;
