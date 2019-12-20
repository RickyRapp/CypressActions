import { action, runInAction, observable, computed } from 'mobx';
import { BookletOrderCreateForm } from 'application/booklet-order/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { BookletOrderService } from 'application/booklet-order/services';
import { DonorAccountService } from 'application/donor-account/services';
import { LookupService } from 'common/services';
import _ from 'lodash';

const ErrorType = {
    Default: 0,
    InsufficientFunds: 1
};

@applicationContext
class BookletOrderCreateViewStore extends BaseEditViewStore {
    @observable denominationTypes = null;
    applicationDefaultSetting = null;
    @observable donorAccount = null;
    @observable countError = null;
    @observable denominationError = null;
    @observable count = '';

    constructor(rootStore) {
        const service = new BookletOrderService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'booklet-order-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        try {
                            await service.create(resource);
                        } catch (err) {
                            if (err && err.data) {
                                if (err.data.errorCode === 7000) {
                                    throw { type: ErrorType.InsufficientFunds, error: err }
                                }
                                else {
                                    throw { type: ErrorType.Default, error: err };
                                }
                            }
                        }
                    }
                }
            },
            errorActions: {
                onCreateError: ({ type, error }) => {
                    switch (type) {
                        case ErrorType.InsufficientFunds:
                            this.rootStore.notificationStore.error(null, error, '$' + error.data.response.toFixed(2));
                            break;
                        default:
                            this.rootStore.notificationStore.error(null, error);
                            break;
                    }
                }
            },
            FormClass: BookletOrderCreateForm,
        });

        this.donorAccountId = rootStore.routerStore.routerState.params.id;
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
                this.fetchDonorAccount(),
                this.fetchApplicationDefaultSetting(),
                this.fetchDenominationTypes()
            ]);

            await this.fetch([
                this.setFormDefaults()
            ]);
        }
    }

    @action.bound
    setFormDefaults() {
        this.form.$('donorAccountId').set('value', this.donorAccountId);
        this.form.$('checkOrderUrl').set('value', `${window.location.origin}/app/booklet-orders/?confirmationNumber={confirmationNumber}`)
        if (this.donorAccount.accountType.abrv === 'basic') {
            this.denominationTypes = _.filter(this.denominationTypes, (item) => { return item.abrv !== 'blank' });
        }
        runInAction(() => {
            this.denominationTypeDropdownStore.setItems(this.denominationTypes);
            this.denominationTypeDropdownStore.setLoading(false);
        });

        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            if (!this.donorAccount.isInitialContributionDone) {
                this.rootStore.notificationStore.warning('BOOKLET_ORDER.CREATE.MISSING_INITIAL_CONTRIBUTION');
                this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: this.donorAccountId });
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

        if (this.donorAccount && this.donorAccount.accountType.abrv === 'basic') {
            total = total + total * (this.donorAccount.certificateFeePercentage / 100)
        }

        if (this.deliveryMethodTypeDropdownStore.value && this.deliveryMethodTypeDropdownStore.value.abrv === 'express-mail') {
            total = total + this.applicationDefaultSetting.expressMailFeeAmount;
        }

        totalAndFee.totalWithFee = total;
        return totalAndFee;
    }

    @action.bound
    async fetchDonorAccount() {
        const service = new DonorAccountService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(this.donorAccountId, {
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
        this.donorAccount = response.data;
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

export default BookletOrderCreateViewStore;
