import { action, runInAction, observable } from 'mobx';
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
            await this.service.review({ ...item });
        }
    });

    constructor(rootStore, charity, selectedItems) {
        super(rootStore);

        this.selectedItems = selectedItems;
        this.service = new DonationService(rootStore.application.baasic.apiClient);
        this.charity = charity;

        this.paymentTypeDropdownStore = new BaasicDropdownStore(null, {
            onChange: () => {
                this.form.$('address').clear();
                this.form.$('bankAccountId').clear();
                this.form.$('address').each((field) => { field.setRequired(false) });
                this.form.$('bankAccountId').each((field) => { field.setRequired(false) });
                if (this.paymentTypeDropdownStore.value.abrv === 'check') {
                    this.form.$('address').each((field) => { field.name !== 'addressLine2' && field.setRequired(true) });
                    this.form.$('address').set(_.find(this.charity.charityAddresses, { primary: true }).address);
                }
                else if (this.paymentTypeDropdownStore.value.abrv === 'ach') {
                    this.form.$('bankAccountId').each((field) => { field.setRequired(true) });
                    this.form.$('bankAccountId').set(this.charity.bankAccount.id);
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
            this.form.$('address').each((field) => { field.setRequired(false) });
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
