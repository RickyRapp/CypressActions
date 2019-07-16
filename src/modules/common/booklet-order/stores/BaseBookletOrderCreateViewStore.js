import { action, observable, computed } from 'mobx';
import { BookletOrderService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { formatDenomination } from 'core/utils';
import _ from 'lodash';

class BaseBookletOrderCreateViewStore extends BaseEditViewStore {
    @observable donorAccount = null;
    @observable denominationTypes = null;
    @observable accountTypes = null;
    @observable deliveryMethodTypes = null;
    @observable deliveryMethodTypeDropdownStore = null;
    @observable refresh = 1;

    additionalActions = {};

    constructor(rootStore, config) {
        super(rootStore, config.createViewStore);

        this.rootStore = rootStore;
        this.userId = config.userId;
        this.bookletOrderService = new BookletOrderService(rootStore.app.baasic.apiClient);
        this.donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        this.denominationTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'denomination-type');
        this.accountTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'account-type');
        this.deliveryMethodTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'delivery-method-type');
    }

    @action.bound async load() {
        await this.getDonorAccount();
        await this.loadLookups();
        this.setFormDefaults();
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
    }

    @action.bound async getDonorAccount() {
        let params = {};
        params.embed = ['coreUser,companyProfile'];
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
                    const disabledDenominationTypeIds = _.map(this.form.$('bookletOrderItems').value, e => { return e.denominationTypeId });
                    var newItems = _.map(this.denominationTypes, item => { return { id: item.id, name: formatDenomination(item, true), disabled: _.includes(disabledDenominationTypeIds, item.id) } })
                    this.denominationTypeDropdownStore.setItems(newItems)
                    this.refresh = this.refresh + 1;
                }
            },
            _.map(this.denominationTypes, item => { return { id: item.id, name: formatDenomination(item, true), disabled: false } })
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

    @action.bound setFormDefaults() {
        if (this.donorAccount) {
            //Rules
            this.form.$('donorAccountId').set('value', this.userId);
            this.form.$('checkOrderUrl').set('value', `${window.location.origin}/booklet-order/?confirmationNumber={confirmationNumber}&showDetails=true`)
        }
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
}

export default BaseBookletOrderCreateViewStore;