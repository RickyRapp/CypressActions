import { action, observable, computed } from 'mobx';
import { DonationService, DonorAccountService, LookupService, CharityService, FeeService, GrantScheduledPaymentService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { FormBase } from 'core/components';
import { GrantReviewPut } from 'modules/administration/grant/forms';
import _ from 'lodash';

class GrantReviewViewStore extends BaseEditViewStore {
    @observable paymentTypeDropdownStore = null;
    @observable grant = null;
    @observable availablePaymentTypes = null;
    @observable paymentTypes = null;
    @observable form = null;
    @observable grantPurposeTypes = null;

    constructor(rootStore, { onAfterReview, id }) {
        const donationService = new DonationService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'grant review',
            id: id,
            actions: {
                update: async item => {
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

                    return await donationService.review(item);
                },
                get: async id => {
                    let params = {};
                    params.embed = [
                        'charity',
                        'charity.charityAddresses',
                        'charity.charityAddresses.address',
                        'charity.bankAccount',
                        'grants'
                    ];
                    params.fields = [
                        'id',
                        'dateCreated',
                        'description',
                        'grants',
                        'grants.amount',
                        'charityId',
                        'charity',
                        'charity.name',
                        'charity.bankAccount',
                        'charity.bankAccount.id',
                        'charity.bankAccount.name',
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

                    const grant = await donationService.get(id, params);
                    return grant;
                }
            },
            FormClass: GrantReviewPut,
            goBack: false,
            onAfterUpdate: onAfterReview,
            loader: true
        });

        this.rootStore = rootStore;
    }

    async getResource(id, updateForm = true) {
        await super.getResource(id, updateForm);
        await this.loadLookups();
        this.form.$('bankAccountId').set('rules', `required_if:paymentTypeId,${this.achId}|string`);
        this.form.$('attOf').set('rules', `required_if:paymentTypeId,${this.checkId}|string`);
        this.form.$('recipientAddress.addressLine1').set('rules', `required_if:paymentTypeId,${this.checkId}|string`);
        this.form.$('recipientAddress.city').set('rules', `required_if:paymentTypeId,${this.checkId}|string`);
        this.form.$('recipientAddress.state').set('rules', `required_if:paymentTypeId,${this.checkId}|string`);
        this.form.$('recipientAddress.zipCode').set('rules', `required_if:paymentTypeId,${this.checkId}|string`);
        this.form.$('recipientAddress').set('value', _.find(this.item.charity.charityAddresses, { primary: true }).address);
        this.setStores();
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

    @action.bound setStores() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Payment Type',
                textField: 'name',
                dataItemKey: 'id'
            },
            {
                onChange: (item) => item.id === this.achId && this.form.$('bankAccountId').set('value', this.item.charity.bankAccount.id)
            },
            _.map(this.availablePaymentTypes, e => { return { id: e.id, name: e.name } })
        );
    }

    @action.bound getAvailablePaymentTypes(paymentTypes) {
        const billPay = _.find(paymentTypes, { id: this.billPayId });
        const check = _.find(paymentTypes, { id: this.checkId });

        let availablePaymentTypes = [billPay, check];
        if (this.item.charity.bankAccount) {
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