import { ContributionStatusStore } from 'application/common/lookup/contribution-status/stores';
import { PaymentTypeStore } from 'application/common/lookup/payment-type/stores';
import { DonationStatusStore } from 'application/common/lookup/donation-status/stores';
import { DonationTypeStore } from 'application/common/lookup/donation-type/stores';
import { CharityTypeStore } from 'application/common/lookup/charity-type/stores';
import { GrantPurposeTypeStore } from 'application/common/lookup/grant-purpose-type/stores';
import { GrantAcknowledgmentTypeStore } from 'application/common/lookup/grant-acknowledgment-type/stores';
import { FeeTypeStore } from 'application/common/lookup/fee-type/stores';
import { GrantScheduleTypeStore } from 'application/common/lookup/grant-schedule-type/stores';
import { ApplicationDefaultSettingStore } from 'application/common/lookup/application-default-setting/stores';
import { PrefixTypeStore } from 'application/common/lookup/prefix-type/stores';
import { AccountTypeStore } from 'application/common/lookup/account-type/stores';
import { EmailTypeStore } from 'application/common/lookup/email-type/stores';
import { DenominationTypeStore } from 'application/common/lookup/denomination-type/stores';
import { DeliveryMethodTypeStore } from 'application/common/lookup/delivery-method-type/stores';
import { BookletTypeStore } from 'application/common/lookup/booklet-type/stores';
import { CertificateStatusStore } from 'application/common/lookup/certificate-status/stores';
import { CharityStatusStore } from 'application/common/lookup/charity-status/stores';
import { HowDidYouHearAboutUsStore } from 'application/common/lookup/how-did-you-hear-about-us/stores';
import { EmailSenderStore } from 'application/common/lookup/email-sender/stores';
import { BookletOrderStatusStore } from 'application/common/lookup/booklet-order-status/stores';
import { BookletStatusStore } from 'application/common/lookup/booklet-status/stores';
import { InvestmentPoolStore } from 'application/common/lookup/investment-pool/stores';

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
        this.investmentPoolStore = new InvestmentPoolStore(this);
    }
}
export default LookupModuleStore;
