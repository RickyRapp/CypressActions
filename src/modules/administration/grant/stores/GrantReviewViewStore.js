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
        params.embed = ['donorAccount,coreUser,charity,charityAddresses,address,bankAccount,grantPurposeMember'];
        this.grant = await this.grantService.get(this.id, params);

        await this.loadLookups();
        await this.initializeForm();
        await this.setStores();
        this.loaderStore.resume();
    }

    @action.bound async loadLookups() {
        const paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        const paymentTypes = await paymentTypeLookupService.getAll();
        this.availablePaymentTypes = this.getAvailablePaymentTypes(paymentTypes.data);

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

    @action.bound async setStores() {
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

    getAvailablePaymentTypes(paymentTypes) {
        let billPay = _.find(paymentTypes, { abrv: 'bill-pay' });
        let check = _.find(paymentTypes, { abrv: 'check' });
        let ach = _.find(paymentTypes, { abrv: 'ach' });

        let availablePaymentTypes = [billPay, check];
        if (this.grant.charity.bankAccount) {
            availablePaymentTypes.push(ach);
        }
        return _.orderBy(availablePaymentTypes, ['sortOrder'], ['asc']);
    }

    @computed get checkId() {
        return this.availablePaymentTypes ? _.find(this.availablePaymentTypes, { abrv: 'check' }).id : null;
    }

    @computed get achId() {
        return this.availablePaymentTypes ? _.find(this.availablePaymentTypes, { abrv: 'ach' }).id : null;
    }

    @computed get billPayId() {
        return this.availablePaymentTypes ? _.find(this.availablePaymentTypes, { abrv: 'bill-pay' }).id : null;
    }
}

export default GrantReviewViewStore