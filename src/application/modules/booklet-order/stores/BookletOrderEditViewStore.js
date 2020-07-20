import { action, runInAction, observable, computed } from 'mobx';
import { BookletOrderEditForm } from 'application/booklet-order/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { BookletOrderService } from 'application/booklet-order/services';
import { DonorService } from 'application/donor/services';
import { LookupService } from 'common/services';
import _ from 'lodash';

const ErrorType = {
    InsufficientFunds: 0
};

@applicationContext
class BookletOrderEditViewStore extends BaseEditViewStore {
    @observable denominationTypes = null;
    applicationDefaultSetting = null;
    @observable donor = null;
    @observable countError = null;
    @observable denominationError = null;
    @observable count = '';
    bookletOrder = '';

    constructor(rootStore) {
        const service = new BookletOrderService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'booklet-order-create',
            id: rootStore.routerStore.routerState.params.editId,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await service.update({
                            id: this.editId,
                            ...resource
                        });
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

        this.donorId = rootStore.routerStore.routerState.params.id;
        this.editId = rootStore.routerStore.routerState.params.editId;
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore({
            placeholder: 'BOOKLET_ORDER.CREATE.FIELDS.DELIVERY_METHOD_TYPE_PLACEHOLDER'
        }, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
                const response = await service.getAll();
                return response.data;
            }
        });
        this.denominationTypeDropdownStore = new BaasicDropdownStore({
            placeholder: 'BOOKLET_ORDER.CREATE.FIELDS.DENOMINATION_PLACEHOLDER'
        },
            {
                onChange: (value) => {
                    this.denominationError = !(value !== null && value !== undefined && value !== '');
                }
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonor(),
                this.fetchApplicationDefaultSetting(),
                this.fetchDenominationTypes()
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
        if (this.donor.accountType.abrv === 'basic') {
            this.denominationTypes = _.filter(this.denominationTypes, (item) => { return item.abrv !== 'blank' });
        }
        runInAction(() => {
            this.denominationTypeDropdownStore.setItems(this.denominationTypes);
            this.denominationTypeDropdownStore.setLoading(false);
        });

        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            if (!this.donor.isInitialContributionDone) {
                this.rootStore.notificationStore.warning('BOOKLET_ORDER.CREATE.MISSING_INITIAL_CONTRIBUTION');
                this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: this.donorId });
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
        else {
            this.countError = !(this.count !== null && this.count !== undefined && this.count !== '');
            this.denominationError = !(this.denominationTypeDropdownStore.value !== null && this.denominationTypeDropdownStore.value !== undefined && this.denominationTypeDropdownStore.value !== '');
        }
    }

    @action.bound onEdit(item) {
        this.count = item.$('count').value;
        this.denominationTypeDropdownStore.setValue(_.find(this.denominationTypes, { id: item.$('denominationTypeId').value }));
        item.del();
        this.resetDenominationDropdownStore();
        this.countError = !(this.count !== null && this.count !== undefined && this.count !== '');
        this.denominationError = !(this.denominationTypeDropdownStore.value !== null && this.denominationTypeDropdownStore.value !== undefined && this.denominationTypeDropdownStore.value !== '');
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

        if (this.donor && this.donor.accountType.abrvId === 'basic') {
            total = total + total * (this.donor.certificateFeePercentage / 100)
        }

        if (this.form && this.form.has('deliveryMethodTypeId')) {
            if (this.deliveryMethodTypeDropdownStore.value && this.deliveryMethodTypeDropdownStore.value.abrv === 'express-mail')
                total = total + this.applicationDefaultSetting.expressMailFeeAmount;
        }

        totalAndFee.totalWithFee = total;
        return totalAndFee;
    }

    @action.bound
    async fetchDonor() {
        const service = new DonorService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(this.donorId, {
            embed: [
                'accountType'
            ],
            fields: [
                'id',
                'donorName',
                'isInitialContributionDone',
                'certificateFeePercentage',
                'accountType',
                'accountType.abrv'
            ]
        });
        this.donor = response.data;
    }

    @action.bound
    async fetchApplicationDefaultSetting() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'application-default-setting');
        const response = await service.getAll();
        this.applicationDefaultSetting = response.data[0];
    }

    @action.bound
    async fetchDenominationTypes() {
        this.denominationTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
        const response = await service.getAll();
        this.denominationTypes = response.data;
        runInAction(() => {
            this.denominationTypeDropdownStore.setItems(this.denominationTypes);
            this.denominationTypeDropdownStore.setLoading(false);
        });
    }
}

export default BookletOrderEditViewStore;
