import { action, runInAction, observable } from 'mobx';
import { DonationReviewForm } from 'application/donation/forms';
import { applicationContext } from 'core/utils';
import { DonationService } from 'application/donation/services';
import { GrantService } from 'application/grant/services';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { LookupService } from 'common/services';
import _ from 'lodash';

@applicationContext
class DonationReviewViewStore extends BaseEditViewStore {
    paymentTypes = null;
    @observable donorName = null;

    constructor(rootStore, id, onAfterReview) {
        const service = new DonationService(rootStore.application.baasic.apiClient);
        const grantService = new GrantService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'donation-review',
            id: id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        let response;
                        if (this.item.donationType.abrv === 'grant' || this.item.donationType.abrv === 'combined-grant') {
                            response = await grantService.review({ ...resource });
                        }
                        onAfterReview();
                        return response;
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'donationStatus',
                                'donationType',
                                'charity',
                                'charity.bankAccount',
                                'charity.charityAddresses',
                                'charity.charityAddresses.address',
                                'grants',
                                'grants.donorAccount',
                                'grants.donorAccount.coreUser',
                                'grants.donorAccount.companyProfile'

                            ]
                        };
                        let response = await service.get(id, params);
                        return response.data;
                    }
                }
            },
            FormClass: DonationReviewForm,
            onAfterAction: onAfterReview
        });

        this.id = id;
        this.paymentTypeDropdownStore = new BaasicDropdownStore(null, {
            onChange: () => {
                this.form.$('address').clear();
                this.form.$('bankAccountId').clear();
                this.form.$('address').each((field) => { field.setRequired(false) });
                this.form.$('bankAccountId').each((field) => { field.setRequired(false) });
                if (this.paymentTypeDropdownStore.value.abrv === 'check') {
                    this.form.$('address').each((field) => { field.name !== 'addressLine2' && field.setRequired(true) });
                    this.form.$('address').set(_.find(this.item.charity.charityAddresses, { primary: true }).address);
                }
                else if (this.paymentTypeDropdownStore.value.abrv === 'ach') {
                    this.form.$('bankAccountId').each((field) => { field.setRequired(true) });
                    this.form.$('bankAccountId').set(this.item.charity.bankAccount.id);
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
            await this.getResource(this.id);
            this.form.$('address').each((field) => { field.setRequired(false) });
            this.form.validate();
            await this.fetchPaymentTypes();
            if (this.item.donationType.abrv === 'grant') {
                this.donorName = this.item.grants[0].donorAccount.donorName
            }
            else if (this.item.donationType.abrv === 'combined-grant') {
                this.donorName = 'Anonymous'
            }

        }
    }

    @action.bound
    getDefaults() {
        let availableStatuses = [];
        availableStatuses.push(_.find(this.paymentTypes, { abrv: 'check' }));
        availableStatuses.push(_.find(this.paymentTypes, { abrv: 'bill-pay' }))
        if (this.item.charity.bankAccount) {
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
