import { ContributionStatusStore } from 'application/lookup/contribution-status/stores';
import { PaymentTypeStore } from 'application/lookup/payment-type/stores';
import { DonationStatusStore } from 'application/lookup/donation-status/stores';
import { DonationTypeStore } from 'application/lookup/donation-type/stores';
import { CharityTypeStore } from 'application/lookup/charity-type/stores';
import { GrantPurposeTypeStore } from 'application/lookup/grant-purpose-type/stores';
import { GrantAcknowledgmentTypeStore } from 'application/lookup/grant-acknowledgment-type/stores';
import { FeeTypeStore } from 'application/lookup/fee-type/stores';
import { GrantScheduleTypeStore } from 'application/lookup/grant-schedule-type/stores';
import { ApplicationDefaultSettingStore } from 'application/lookup/application-default-setting/stores';
import { PrefixTypeStore } from 'application/lookup/prefix-type/stores';
import { AccountTypeStore } from 'application/lookup/account-type/stores';
import { EmailTypeStore } from 'application/lookup/email-type/stores';
import { DenominationTypeStore } from 'application/lookup/denomination-type/stores';
import { DeliveryMethodTypeStore } from 'application/lookup/delivery-method-type/stores';
import { BookletTypeStore } from 'application/lookup/booklet-type/stores';
import { CertificateStatusStore } from 'application/lookup/certificate-status/stores';
import { CharityStatusStore } from 'application/lookup/charity-status/stores';
import { HowDidYouHearAboutUsStore } from 'application/lookup/how-did-you-hear-about-us/stores';
import { EmailSenderStore } from 'application/lookup/email-sender/stores';
import { BookletOrderStatusStore } from 'application/lookup/booklet-order-status/stores';
import { BookletStatusStore } from 'application/lookup/booklet-status/stores';

class LookupModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.contributionStatusStore = new ContributionStatusStore(this);
        this.paymentTypeStore = new PaymentTypeStore(this);
        this.donationStatusStore = new DonationStatusStore(this);
        this.donationTypeStore = new DonationTypeStore(this);
        this.charityTypeStore = new CharityTypeStore(this);
        this.grantPurposeTypeStore = new GrantPurposeTypeStore(this);
        this.grantAcknowledgmentTypeStore = new GrantAcknowledgmentTypeStore(this);
        this.feeTypeStore = new FeeTypeStore(this);
        this.grantScheduleTypeStore = new GrantScheduleTypeStore(this);
        this.applicationDefaultSettingStore = new ApplicationDefaultSettingStore(this);
        this.prefixTypeStore = new PrefixTypeStore(this);
        this.accountTypeStore = new AccountTypeStore(this);
        this.emailTypeStore = new EmailTypeStore(this);
        this.denominationTypeStore = new DenominationTypeStore(this);
        this.deliveryMethodTypeStore = new DeliveryMethodTypeStore(this);
        this.bookletTypeStore = new BookletTypeStore(this);
        this.bookletStatusStore = new BookletStatusStore(this);
        this.certificateStatusStore = new CertificateStatusStore(this);
        this.charityStatusStore = new CharityStatusStore(this);
        this.howDidYouHearAboutUsStore = new HowDidYouHearAboutUsStore(this);
        this.emailSenderStore = new EmailSenderStore(this);
        this.bookletOrderStatusStore = new BookletOrderStatusStore(this);
    }
}
export default LookupModuleStore;
