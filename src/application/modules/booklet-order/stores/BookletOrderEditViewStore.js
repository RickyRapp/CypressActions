import { action, runInAction, observable, computed } from 'mobx';
import { BookletOrderEditForm } from 'application/booklet-order/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { BookletOrderService } from 'application/booklet-order/services';
import { DonorAccountService } from 'application/donor-account/services';
import { LookupService } from 'common/services';
import _ from 'lodash';

const ErrorType = {
    InsufficientFunds: 0
};

@applicationContext
class BookletOrderEditViewStore extends BaseEditViewStore {
    @observable denominationTypes = null;
    applicationDefaultSetting = null;
    donorAccount = null;
    @observable countError = null;
    @observable denominationError = null;
    @observable count = '';
    bookletOrder = '';

    constructor(rootStore) {
        const service = new BookletOrderService(rootStore.application.baasic.apiClient);
        const id = rootStore.routerStore.routerState.params.id;
        const editId = rootStore.routerStore.routerState.params.editId;

        super(rootStore, {
            name: 'booklet-order-create',
            id: editId,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        try {
                            return await service.update({
                                id: editId,
                                ...resource
                            });
                        } catch (err) {
                            //TODO:send status code/type from backend
                            // throw { type: ErrorType.InsufficientFunds, error: err };
                        }
                    },
                    get: async (id) => {
                        const params = {
                            embed: [
                                'bookletOrderItems'
                            ],
                            fields: [
                                'deliveryMethodTypeId',
                                'bookletOrderItems',
                                'bookletOrderItems.count',
                                'bookletOrderItems.denominationTypeId',
                            ]
                        }
                        const response = await service.get(id, params);
                        this.bookletOrder = response.data;
                        return response.data;
                    }
                }
            },
            errorActions: {
                onCreateError: ({ type, error }) => {
                    switch (type) {
                        case ErrorType.InsufficientFunds:
                            rootStore.notificationStore.error('BOOKLET_ORDER.CREATE.INSUFFICIENT_FUNDS_ERROR', error);
                            break;
                        default:
                            rootStore.notificationStore.success('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
            FormClass: BookletOrderEditForm
        });

        this.id = id;
        this.editId = editId;
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore();
        this.denominationTypeDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorAccount(),
                this.fetchDeliveryMethodTypes(),
                this.fetchDenominationTypes(),
                this.fetchApplicationDefaultSetting()
            ]);

            await this.getResource(this.editId);
            this.form.$('bookletOrderItems').add(this.bookletOrder.bookletOrderItems.map(value => { return { count: value.count, denominationTypeId: value.denominationTypeId } }))

            await this.fetch([
                this.setFormDefaults()
            ]);
        }
    }

    @action.bound
    setFormDefaults() {
        if (this.donorAccount.accountType.abrv === 'basic') {
            this.denominationTypes = _.filter(this.denominationTypes, (item) => { return item.abrv !== 'blank' });
        }
        runInAction(() => {
            this.denominationTypeDropdownStore.setItems(this.denominationTypes);
            this.denominationTypeDropdownStore.setLoading(false);
        });

        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            if (!this.donorAccount.initialContribution) {
                this.rootStore.notificationStore.warning('Missing Initial Contribution. You Are Redirected On Contribution Page.');
                this.rootStore.routerStore.goTo(
                    'master.app.main.contribution.create',
                    { id: this.id }
                );
            }
        }
    }

    @action.bound onDel(item) {
        item.del();
        this.resetDenominationDropdownStore();
    }

    @action.bound onAdd() {
        if (this.count && this.denominationTypeDropdownStore.value) {
            this.form.$('bookletOrderItems').add([{ count: this.count, denominationTypeId: this.denominationTypeDropdownStore.value.id }])
            this.count = '';
            this.denominationTypeDropdownStore.setValue(null);
            this.resetDenominationDropdownStore();
        }
    }

    @action.bound onEdit(item) {
        this.count = item.$('count').value;
        this.denominationTypeDropdownStore.setValue(_.find(this.denominationTypes, { id: item.$('denominationTypeId').value }));
        item.del();
        this.resetDenominationDropdownStore();
    }

    @action
    resetDenominationDropdownStore() {
        const usedDenominationTypeIds = _.map(this.form.$('bookletOrderItems').value, 'denominationTypeId');
        const availableDenominations = _.filter(this.denominationTypes, function (params) { return !_.includes(usedDenominationTypeIds, params.id) })
        this.denominationTypeDropdownStore.setItems(availableDenominations);
    }

    @action.bound onCountChange(event) {
        this.count = event.target.value;
        this.countError = !(this.count !== null && this.count !== undefined && this.count !== '');
    }

    @computed get mostCommonDenominations() {
        if (this.denominationTypes) {
            const usedDenominationTypeIds = _.map(this.form.$('bookletOrderItems').value, 'denominationTypeId');
            return _.filter(this.denominationTypes, function (item) {
                return item.mostCommon && item.available && !_.includes(usedDenominationTypeIds, item.id);
            });
        }
        return [];
    }

    @computed get totalAndFee() {
        let totalAndFee = {};
        let total = 0;
        if (this.form && this.form.has('bookletOrderItems')) {
            _.forEach(this.form.$('bookletOrderItems').values(), (item) => {
                const denomination = _.find(this.denominationTypes, { id: item.denominationTypeId });
                if (denomination)
                    total = total + (denomination.value * denomination.certificateAmount * item.count);
            })
        }

        totalAndFee.total = total;

        if (this.donorAccount && this.donorAccount.accountType.abrvId === 'basic') {
            total = total + total * (this.donorAccount.certificateFeePercentage / 100)
        }

        if (this.form && this.form.has('deliveryMethodTypeId')) {
            if (this.deliveryMethodTypeDropdownStore.value && this.deliveryMethodTypeDropdownStore.value.abrv === 'express-mail')
                total = total + this.applicationDefaultSetting.expressMailFeeAmount;
        }

        totalAndFee.totalWithFee = total;

        return totalAndFee;
    }

    @action.bound
    async fetchDonorAccount() {
        const service = new DonorAccountService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(this.id, {
            embed: [
                'accountType',
                'coreUser',
                'companyProfile',
                'donorAccountAddresses',
                'donorAccountAddresses.address',
                'donorAccountEmailAddresses',
                'donorAccountEmailAddresses.emailAddress',
                'donorAccountPhoneNumbers',
                'donorAccountPhoneNumbers.phoneNumber'
            ],
            fields: [
                'id',
                'donorName',
                'initialContribution',
                'certificateFeePercentage',
                'accountType',
                'accountType.abrv'
            ]
        });
        this.donorAccount = response.data;
    }

    @action.bound
    async fetchDeliveryMethodTypes() {
        this.deliveryMethodTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
        const response = await service.getAll();
        runInAction(() => {
            this.deliveryMethodTypeDropdownStore.setItems(response.data);
            this.deliveryMethodTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchDenominationTypes() {
        this.denominationTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
        const response = await service.getAll();
        this.denominationTypes = response.data;
    }

    @action.bound
    async fetchApplicationDefaultSetting() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'application-default-setting');
        const response = await service.getAll();
        this.applicationDefaultSetting = response.data[0];
    }
}

export default BookletOrderEditViewStore;
