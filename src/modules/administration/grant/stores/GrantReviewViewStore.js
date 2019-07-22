import { action, observable, computed } from 'mobx';
import { GrantCreateFormFields } from 'modules/common/grant/forms';
import { GrantService, DonorAccountService, LookupService, CharityService, FeeService, GrantScheduledPaymentService } from "common/data";
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { FormBase } from 'core/components';
import { GrantReviewPut } from 'modules/administration/grant/forms';
import _ from 'lodash';

class GrantReviewViewStore extends BaseViewStore {
    @observable paymentTypeDropdownStore = null;
    @observable grant = null;
    @observable availablePaymentTypes = null;
    @observable paymentTypes = null;
    @observable form = null;
    @observable grantPurposeTypes = null;

    constructor(rootStore, { onAfterReview, id }) {
        super(rootStore);
        this.rootStore = rootStore;
        this.grantService = new GrantService(this.rootStore.app.baasic.apiClient);
        this.onAfterReview = onAfterReview;
        this.id = id;
        this.load();
    }

    @action.bound async load() {
        this.loaderStore.suspend();
        let params = {};
        params.embed = [
            'donorAccount',
            'donorAccount.coreUser',
            'donorAccount.companyProfile',
            'charity',
            'charity.charityAddresses',
            'charity.charityAddresses.address',
            'charity.bankAccount',
            'grantPurposeMember'
        ];
        params.fields = [
            'id',
            'amount',
            'dateCreated',
            'description',
            'grantPurposeTypeId',
            'confirmationNumber',
            'donorAccount',
            'donorAccount.donorName',
            'charity',
            'charity.name',
            'charity.charityAddresses',
            'charity.charityAddresses.primary',
            'charity.charityAddresses.address',
            'charity.charityAddresses.address.id',
            'charity.charityAddresses.address.addressLine1',
            'charity.charityAddresses.address.addressLine2',
            'charity.charityAddresses.address.city',
            'charity.charityAddresses.address.state',
            'charity.charityAddresses.address.zipCode',
        ];
        this.grant = await this.grantService.get(this.id, params);

        await this.loadLookups();
        await this.initializeForm();
        this.setStores();
        this.loaderStore.resume();
    }

    @action.bound async loadLookups() {
        const paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        const paymentTypeModels = await paymentTypeLookupService.getAll();
        this.paymentTypes = paymentTypeModels.data;
        this.availablePaymentTypes = this.getAvailablePaymentTypes(this.paymentTypes);

        const grantPurposeTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'grant-purpose-type');
        const grantPurposeTypes = await grantPurposeTypeLookupService.getAll();
        this.grantPurposeTypes = grantPurposeTypes.data;
    }

    @action.bound async initializeForm() {
        const fields = GrantReviewPut(this.checkId, this.achId, this.grant);
        this.form = new FormBase({
            onSuccess: async (form) => {
                this.loaderStore.suspend();
                const item = form.values();

                if (item.paymentTypeId === this.checkId) {
                    item.bankAccountId = null;
                }
                else if (item.paymentTypeId === this.achId) {
                    item.recipientAddress = {};
                    item.attOf = null;
                }
                else if (item.paymentTypeId === this.billPayId) {
                    item.recipientAddress = {};
                    item.attOf = null;
                    item.bankAccountId = null;
                }

                try {
                    const response = await this.grantService.review(item);
                    this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
                    if (_.isFunction(this.onAfterReview)) {
                        this.onAfterReview();
                    }
                } catch (errorResponse) {
                    this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
                    this.loaderStore.resume();
                    return;
                }

                this.loaderStore.resume();
            },
            onError(form) {
                alert('### see console');
                console.log('Form Errors', form.errors());
            },
        }, fields);
    }

    @action.bound setStores() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Payment Type',
                textField: 'name',
                dataItemKey: 'id'
            },
            {
                onChange: (option) => this.form.$('paymentTypeId').set('value', option ? option.id : null)
            },
            _.map(this.availablePaymentTypes, e => { return { id: e.id, name: e.name } })
        );
    }

    @action.bound getAvailablePaymentTypes(paymentTypes) {
        const billPay = _.find(paymentTypes, { id: this.billPayId });
        const check = _.find(paymentTypes, { id: this.checkId });

        let availablePaymentTypes = [billPay, check];
        if (this.grant.charity.bankAccount) {
            const ach = _.find(paymentTypes, { id: this.achId });
            availablePaymentTypes.push(ach);
        }
        return _.orderBy(availablePaymentTypes, ['sortOrder'], ['asc']);
    }

    @computed get checkId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'check' }).id : null;
    }

    @computed get achId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'ach' }).id : null;
    }

    @computed get billPayId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'bill-pay' }).id : null;
    }
}

export default GrantReviewViewStore