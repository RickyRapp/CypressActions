import { action, runInAction } from 'mobx';
import { DonationReviewForm } from 'application/donation/forms';
import { applicationContext } from 'core/utils';
import { DonationService } from 'application/donation/services';
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { LookupService } from 'common/services';
import _ from 'lodash';

@applicationContext
class DonationReviewViewStore extends BaseViewStore {
    paymentTypes = null;

    form = new DonationReviewForm({
        onSuccess: async form => {
            const item = form.values();
            if (!item.donationIds || item.donationIds.length === 0) {
                this.rootStore.notificationStore.warning('DONATION.REVIEW.SELECT_DONATIONS_WARNING');
                return;
            }
            if (item.paymentTypeId === '-1') {
                item.paymentTypeId = null;
            }
            await this.service.review({ ...item });
            this.rootStore.routerStore.goBack();
        }
    });

    constructor(rootStore, charity, selectedItems) {
        super(rootStore);

        this.selectedItems = selectedItems;
        this.service = new DonationService(rootStore.application.baasic.apiClient);
        this.charity = charity;
        this.rootStore = rootStore;

        this.paymentTypeDropdownStore = new BaasicDropdownStore(null, {
            onChange: () => {
                this.form.$('addressLine1').clear();
                this.form.$('addressLine2').clear();
                this.form.$('city').clear();
                this.form.$('state').clear();
                this.form.$('zipCode').clear();
                this.form.$('bankAccountId').clear();
                this.form.$('addressLine1').setRequired(false);
                this.form.$('city').setRequired(false);
                this.form.$('state').setRequired(false);
                this.form.$('zipCode').setRequired(false);
                this.form.$('bankAccountId').setRequired(false);
                this.form.$('paymentTypeId').setRequired(true);
                this.form.$('paymentNumber').setRequired(true);
                if (this.paymentTypeDropdownStore.value.abrv === 'check') {
                    this.form.$('addressLine1').setRequired(true);
                    this.form.$('city').setRequired(true);
                    this.form.$('state').setRequired(true);
                    this.form.$('zipCode').setRequired(true);
                    const address = _.find(this.charity.charityAddresses, { isPrimary: true });
                    this.form.$('addressLine1').set(address.addressLine1);
                    this.form.$('city').set(address.city);
                    this.form.$('state').set(address.state);
                    this.form.$('zipCode').set(address.zipCode);
                }
                else if (this.paymentTypeDropdownStore.value.abrv === 'ach') {
                    this.form.$('bankAccountId').setRequired(true);
                    this.form.$('bankAccountId').set(this.charity.charityBankAccounts[0].id);
                }
                else if (this.paymentTypeDropdownStore.value.abrv === 'transfer-to-charity-account') {
                    this.form.$('paymentTypeId').setRequired(false);
                    this.form.$('paymentNumber').setRequired(false);
                }
            }
        });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.form.clear();
            this.form.$('addressLine1').setRequired(false);
            this.form.$('city').setRequired(false);
            this.form.$('state').setRequired(false);
            this.form.$('zipCode').setRequired(false);
            this.form.validate();
            await this.fetchPaymentTypes();
        }
    }

    @action.bound
    getDefaults() {
        let availableStatuses = [];
        availableStatuses.push(_.find(this.paymentTypes, { abrv: 'check' }));
        availableStatuses.push(_.find(this.paymentTypes, { abrv: 'bill-pay' }))
        if (this.charity.bankAccount) {
            availableStatuses.push(_.find(this.paymentTypes, { abrv: 'ach' }))
        }
        availableStatuses.push({ id: '-1', name: 'Transfer to charity account', abrv: 'transfer-to-charity-account' });
        return availableStatuses;
    }

    @action.bound
    async fetchPaymentTypes() {
        this.paymentTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'payment-type');
        const response = await service.getAll();
        this.paymentTypes = response.data;
        const availableStatuses = this.getDefaults();
        runInAction(() => {
            this.paymentTypeDropdownStore.setItems(availableStatuses);
            this.paymentTypeDropdownStore.setLoading(false);
        });
    }
}

export default DonationReviewViewStore;
