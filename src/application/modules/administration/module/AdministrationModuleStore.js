import { DashboardStore } from 'application/administration/dashboard/stores';
import { DonorStore } from 'application/administration/donor/stores';
import { ContributionStore } from 'application/administration/contribution/stores';
import { GrantStore } from 'application/administration/grant/stores';
import { CharityStore } from 'application/administration/charity/stores';
import { EmailStore } from 'application/administration/email/stores';
import { BookletOrderStore } from 'application/administration/booklet-order/stores';
import { BookletStore } from 'application/administration/booklet/stores';
import { SessionStore } from 'application/administration/session/stores';
import { GivingCardStore } from 'application/administration/giving-card/stores';
import { CharityWebsiteStore } from 'application/administration/charity-website/stores';
import { BankStore } from 'application/administration/bank/stores';
import { DonationStore } from 'application/administration/donation/stores';
import { DonorNoteStore } from 'application/administration/donor-note/stores';
import { ReconcileStore } from 'application/administration/reconcile/stores';
import { InvestmentStore } from 'application/common/investment/stores';
import { CreditDebitStore } from 'application/administration/credit-debit/stores';

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
        this.givingCardStore = new GivingCardStore(this);
        this.charityWebsiteStore = new CharityWebsiteStore(this);
        this.bankStore = new BankStore(this);
        this.donationStore = new DonationStore(this);
        this.donorNoteStore = new DonorNoteStore(this);
        this.reconcileStore = new ReconcileStore(this);
        this.investmentStore = new InvestmentStore(this);
        this.creditDebitStore = new CreditDebitStore(this);
    }
}
export default AdministrationModuleStore;
