import { action, observable, computed } from 'mobx';
import { BookletOrderService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { formatDenomination } from 'core/utils';
import _ from 'lodash';

class BaseBookletOrderEditViewStore extends BaseEditViewStore {
    @observable donorAccount = null;
    @observable denominationTypes = null;
    @observable accountTypes = null;
    @observable deliveryMethodTypes = null;
    @observable bookletOrderStatuses = null;
    @observable deliveryMethodTypeDropdownStore = null;
    @observable refresh = 1;
    @observable bookletOrder = null;

    additionalActions = {};

    constructor(rootStore, config) {
        super(rootStore, config.editViewStore);

        this.rootStore = rootStore;
        this.id = config.id;
        this.userId = config.userId;
        this.bookletOrderService = new BookletOrderService(rootStore.app.baasic.apiClient);
        this.donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        this.denominationTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'denomination-type');
        this.bookletOrderStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'booklet-order-status');
        this.accountTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'account-type');
        this.deliveryMethodTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'delivery-method-type');
    }

    async getResource(id, updateForm = true) {
        await super.getResource(id, updateForm);
        let arra = this.bookletOrder.bookletOrderItems.map(value => { return { count: value.count, denominationTypeId: value.denominationTypeId } })
        this.form.$('bookletOrderItems').add(arra);
        await this.load();
        if (await this.validateBeforeEditing()) {
            await this.setFormDefaults();
        }
    }

    @action.bound async validateBeforeEditing() {
        if (this.bookletOrder.bookletOrderStatusId !== this.bookletOrderPendingStatusId) {
            await this.rootStore.routerStore.goBack();
            this.rootStore.notificationStore.warning('Booklet Order Can be Edited Only In Pending Status.');
            return false;
        }
        return true;
    }

    @action.bound async load() {
        await this.getDonorAccount();
        await this.loadLookups();
        this.setStores();
    }

    @action.bound async loadLookups() {
        let denominationTypesModels = await this.denominationTypeLookupService.getAll();
        if (this.donorAccount.accountTypeId === this.basicAccountTypeId) {
            this.denominationTypes = _.filter(this.denominationTypes, function (item) { return item.abrv !== 'blank' });
        }
        else {
            this.denominationTypes
        }
        this.denominationTypes = _.orderBy(denominationTypesModels.data, ['sortOrder'], ['asc']);

        let accountTypesModels = await this.accountTypeLookupService.getAll();
        this.accountTypes = _.orderBy(accountTypesModels.data, ['sortOrder'], ['asc']);

        let deliveryMethodTypesModels = await this.deliveryMethodTypeLookupService.getAll();
        this.deliveryMethodTypes = _.orderBy(deliveryMethodTypesModels.data, ['sortOrder'], ['asc']);

        let bookletOrderStatusesModels = await this.bookletOrderStatusLookupService.getAll();
        this.bookletOrderStatuses = _.orderBy(bookletOrderStatusesModels.data, ['sortOrder'], ['asc']);
    }

    @action.bound async getDonorAccount() {
        let params = {};
        params.embed = ['coreUser,companyProfile,donorAccountEmailAddresses,emailAddress'];
        this.donorAccount = await this.donorAccountService.get(this.userId, params)
    }

    @action.bound setStores() {
        this.denominationTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: () => {
                    this.denominationTypeDropdownStore.setItems(this.setDenominationDropdownStoreItems())
                    this.refresh = this.refresh + 1;
                }
            },
            this.setDenominationDropdownStoreItems()
        );

        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Delivery Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
            },
            this.deliveryMethodTypes
        );
    }

    @action.bound setDenominationDropdownStoreItems() {
        const disabledDenominationTypeIds = _.map(this.form.$('bookletOrderItems').value, e => { return e.denominationTypeId });
        var newItems = _.map(this.denominationTypes, item => { return { id: item.id, name: formatDenomination(item, true, true), disabled: item.available ? _.includes(disabledDenominationTypeIds, item.id) : true } });
        return newItems;
    }

    @action.bound setFormDefaults() {
    }

    @action.bound onDel(item) {
        if (item.$('denominationTypeId').value) {
            _.find(this.denominationTypeDropdownStore.items, { id: item.$('denominationTypeId').value }).disabled = false;
        }
        item.del();
        this.refresh = this.refresh + 1
    }

    @computed get basicAccountTypeId() {
        return this.accountTypes ? _.find(this.accountTypes, { abrv: 'basic' }).id : null;
    }

    @computed get premiumAccountTypeId() {
        return this.accountTypes ? _.find(this.accountTypes, { abrv: 'premium' }).id : null;
    }

    @computed get expresMailDeliveryMethodTypeId() {
        return this.deliveryMethodTypes ? _.find(this.deliveryMethodTypes, { abrv: 'express-mail' }).id : null;
    }

    @computed get bookletOrderPendingStatusId() {
        return this.bookletOrderStatuses ? _.find(this.bookletOrderStatuses, { abrv: 'pending' }).id : null;
    }

    @computed get mostCommonDenominations() {
        if (this.denominationTypes) {
            const disabledDenominationTypeIds = _.map(this.form.$('bookletOrderItems').value, e => { return e.denominationTypeId });
            return _.filter(this.denominationTypes, function (item) {
                return item.mostCommon && item.available && !_.includes(disabledDenominationTypeIds, item.id);
            });
        }
        return [];
    }

    @computed get totalAndFee() {
        let _totalAndFee = {};
        let totala = 0;
        if (this.form && this.form.has('bookletOrderItems')) {
            _.forEach(this.form.$('bookletOrderItems').values(), item => {
                const denomination = _.find(this.denominationTypes, { id: item.denominationTypeId });
                if (denomination)
                    totala = totala + (denomination.value * denomination.certificateAmount * item.count);
            })
        }

        _totalAndFee.total = totala;

        if (this.donorAccount) {
            totala = totala + totala * (this.donorAccount.certificateFee / 100)
        }

        if (this.form && this.form.has('deliveryMethodTypeId')) {
            const deliveryMethodTypeId = this.form.$('deliveryMethodTypeId').values();
            if (deliveryMethodTypeId === this.expresMailDeliveryMethodTypeId)
                totala = totala + 25;
        }

        _totalAndFee.totalWithFee = totala;

        return _totalAndFee;
    }
}

export default BaseBookletOrderEditViewStore;