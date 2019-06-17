import { action, observable } from 'mobx';
import { LookupService, AddressService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import _ from 'lodash';

class BaseCharityEditViewStore extends BaseEditViewStore {
    @observable charityTypeDropdownStore = null;
    @observable charityStatusDropdownStore = null;

    constructor(rootStore, config) {
        super(rootStore, config.editViewStore);

        this.userId = config.userId;
        this.rootStore = rootStore;
    }

    async updateResource(resource) {
        await super.updateResource(resource);
        await this.getResource(this.id)
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setStores();
    }

    @action.bound async loadLookups() {
        this.charityTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'charity-type');
        let charityTypeModels = await this.charityTypeLookupService.getAll();
        this.charityType = _.orderBy(charityTypeModels.data, ['sortOrder'], ['asc']);

        this.charityStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'charity-Status');
        let charityStatusModels = await this.charityStatusLookupService.getAll();
        this.charityStatus = _.orderBy(charityStatusModels.data, ['sortOrder'], ['asc']);
    }

    @action.bound async setStores() {
        this.charityTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Charity Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => this.form.$('charityTypeId').set('value', option ? option.id : null)
            },
            _.map(this.charityType, e => { return { id: e.id, name: e.name } })
        );

        this.charityStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Set Charity Status',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => this.form.$('charityStatusId').set('value', option ? option.id : null)
            },
            _.map(this.charityStatus, e => { return { id: e.id, name: e.name } })
        );
    }

    @action.bound async onMarkPrimaryAddress(addressId) {
        this.addressService = new AddressService(this.rootStore.app.baasic.apiClient);
        try {
            const response = await this.addressService.markPrimary('charity/mark-primary', this.userId, addressId);
            this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
            await this.getResource(this.userId, false);
        } catch (errorResponse) {
            this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
            return;
        }
    }

    @action.bound async onAfterAddressCreate() {
        await this.getResource(this.userId, false);
    }
}

export default BaseCharityEditViewStore;