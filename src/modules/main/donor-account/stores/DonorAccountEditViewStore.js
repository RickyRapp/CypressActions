import { action, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from "core/stores";
import { DonorAccountService, LookupService } from "common/data";
import { DonorAccountEditForm } from 'modules/main/donor-account/forms';
import { isSome } from 'core/utils';
import _ from 'lodash';

class DonorAccountEditViewStore extends BaseEditViewStore {
    @observable deliveryMethodTypeDropdownStore = null;
    @observable prefixTypeDropdownStore = null;
    @observable accountType = null;
    @observable premiumId = null;

    constructor(rootStore, { userId }) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor account',
            id: userId,
            actions: {
                update: async donorAccount => {
                    donorAccount.coreUser.json = JSON.stringify({ middleName: donorAccount.coreUser.middleName, prefixTypeId: donorAccount.coreUser.prefixTypeId });
                    if (!donorAccount.companyProfileId) {
                        donorAccount.companyProfile = null;
                    }
                    return await donorAccountService.update({ id: this.id, ...donorAccount });
                },
                get: async id => {
                    let params = {};
                    params.embed = ['coreUser,companyProfile,contactPerson,address,emailAddress,phoneNumber'];
                    const response = await donorAccountService.get(id, params);
                    if (isSome(response)) {
                        if (isSome(response.coreUser) && isSome(response.coreUser.json)) {
                            response.coreUser.middleName = (JSON.parse(response.coreUser.json)).middleName;
                            response.coreUser.prefixTypeId = (JSON.parse(response.coreUser.json)).prefixTypeId;
                        }
                        response.isCompany = isSome(response.companyProfileId)

                    }
                    return response;
                }
            },
            FormClass: DonorAccountEditForm,
            goBack: false,
            setValues: true
        });

        this.deliveryMethodTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'delivery-method-type');
        this.prefixTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'prefix-type');
        this.accountTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'account-type');
        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setStores();
    }

    @action.bound async loadLookups() {
        let deliveryMethodTypeModels = await this.deliveryMethodTypeLookupService.getAll();
        this.deliveryMethodType = deliveryMethodTypeModels.data;

        let prefixTypeModels = await this.prefixTypeLookupService.getAll();
        this.prefixType = prefixTypeModels.data;

        let accountTypeModels = await this.accountTypeLookupService.getAll();
        this.accountType = accountTypeModels.data;
        this.donorAccountType = _.find(this.accountType, { id: this.form.$('accountTypeId').value });
        this.premiumId = _.find(this.accountType, { abrv: 'premium' }).id;
    }

    @action.bound async setStores() {
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false,
                placeholder: 'Choose Delivery Method'
            },
            {
                onChange: this.onChangeDeliveryMethod
            },
            this.deliveryMethodType
        );

        this.prefixTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true,
                placeholder: 'Choose Prefix Type'
            },
            {
                onChange: this.onChangePrefixType
            },
            this.prefixType
        );
    }

    @action.bound async onChangeDeliveryMethod(option) {
        this.form.$('deliveryMethodTypeId').set('value', option ? option.id : null);
    }

    @action.bound async onChangePrefixType(option) {
        this.form.$('coreUser.prefixTypeId').set('value', option ? option.id : null);
    }
}

export default DonorAccountEditViewStore;