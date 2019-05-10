import { action, observable } from 'mobx';
import { CharityUpdateForm } from 'modules/main/charity/forms';
import { CharityService, LookupService, AddressService, FileStreamRouteService, FileStreamService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import _ from 'lodash';

class CharityEditViewStore extends BaseEditViewStore {
    @observable charityTypeDropdownStore = null;
    @observable charityStatusDropdownStore = null;
    @observable hasLogin = false;
    @observable hasContactInformation = false;
    @observable hasBankAccount = false;
    @observable charity = null;
    @observable form = null;
    @observable imgPreview = null;

    constructor(rootStore) {
        const charityService = new CharityService(rootStore.app.baasic.apiClient);
        const fileStreamRouteService = new FileStreamRouteService(rootStore.app.baasic.apiClient);
        const fileStreamService = new FileStreamService(rootStore.app.baasic.apiClient);
        const userId = rootStore.authStore.user.id;

        super(rootStore, {
            name: 'charity',
            id: userId,
            actions: {
                update: async item => {
                    if (!(item.contactInformation && item.contactInformation.firstName && item.contactInformation.lastName)) {
                        item.contactInformation = null;
                    }
                    if (!(item.emailAddress && item.emailAddress.email)) {
                        item.emailAddress = null;
                    }
                    
                    return await charityService.update({ id: this.id, ...item });
                },
                get: async id => {
                    let params = {};
                    params.embed = ['charityAddresses,address,coreUser,coreMembership,contactInformation,address,emailAddress,phoneNumber,bankAccount'];
                    const response = await charityService.get(id, params);

                    this.charity = response;
                    if (this.charity && this.charity.bankAccount) {
                        if (this.charity.bankAccount.coreMediaVaultEntryId) {
                            this.imgPreview = await fileStreamRouteService.getPreview(this.charity.bankAccount.coreMediaVaultEntryId)
                        }
                    }

                    return this.charity;
                }
            },
            FormClass: CharityUpdateForm,
            goBack: false,
            setValues: true
        });


        this.rootStore = rootStore;
        this.load();
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
            _.map(this.charityType, e => { return { 'id': e.id, 'name': e.name } })
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
            _.map(this.charityStatus, e => { return { 'id': e.id, 'name': e.name } })
        );
    }

    @action.bound async onMarkPrimaryAddress(addressId) {
        this.addressService = new AddressService(this.rootStore.app.baasic.apiClient);
        try {
            const response = await this.addressService.markPrimary('charity/mark-primary', this.id, addressId);
            this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
            await this.getResource(this.id, false);
        } catch (errorResponse) {
            this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
            return;
        }
    }

    @action.bound async onAfterAddressCreate() {
        await this.getResource(this.id, false);
    }
}

export default CharityEditViewStore;