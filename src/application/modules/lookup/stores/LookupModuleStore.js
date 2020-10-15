import { ContributionStatusStore } from 'application/lookup/contribution-status/stores';
import { PaymentTypeStore } from 'application/lookup/payment-type/stores';
import { DonationStatusStore } from 'application/lookup/donation-status/stores';
import { CharityTypeStore } from 'application/lookup/charity-type/stores';
import { GrantPurposeTypeStore } from 'application/lookup/grant-purpose-type/stores';
import { GrantAcknowledgmentTypeStore } from 'application/lookup/grant-acknowledgment-type/stores';
import { FeeTypeStore } from 'application/lookup/fee-type/stores';
import { GrantScheduleTypeStore } from 'application/lookup/grant-schedule-type/stores';
import { ApplicationDefaultSettingStore } from 'application/lookup/application-default-setting/stores';

class LookupModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.contributionStatusStore = new ContributionStatusStore(this);
        this.paymentTypeStore = new PaymentTypeStore(this);
        this.donationStatusStore = new DonationStatusStore(this);
        this.charityTypeStore = new CharityTypeStore(this);
        this.grantPurposeTypeStore = new GrantPurposeTypeStore(this);
        this.grantAcknowledgmentTypeStore = new GrantAcknowledgmentTypeStore(this);
        this.feeTypeStore = new FeeTypeStore(this);
        this.grantScheduleTypeStore = new GrantScheduleTypeStore(this);
        this.applicationDefaultSettingStore = new ApplicationDefaultSettingStore(this);
    }
}
export default LookupModuleStore;
