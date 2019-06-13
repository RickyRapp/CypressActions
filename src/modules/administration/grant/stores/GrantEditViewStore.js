import { action, observable, computed } from 'mobx';
import { GrantUpdateFormFields } from 'modules/common/grant/forms';
import { GrantService, DonorAccountService, LookupService, CharityService, FeeService, GrantScheduledPaymentService } from "common/data";
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { FormBase } from 'core/components';
import { getCharityNameDropdown } from 'core/utils';
import _ from 'lodash';

class GrantEditViewStore extends BaseViewStore {
    @observable grantPurposeTypes = null;
    @observable grantAcknowledgmentTypes = null;
    @observable grantScheduleTypes = null;
    @observable feeTypes = null;
    @observable grantPurposeTypeDropdownStore = null;
    @observable grantAcknowledgmentTypeDropdownStore = null;
    @observable grantScheduleTypeDropdownStore = null;
    @observable charityDropdownStore = null;
    @observable form = null;
    @observable donorAccount = null;
    @observable totalAmount = 0;
    @observable userId = 0;
    @observable grant = null;

    constructor(rootStore) {
        super(rootStore)

        this.id = rootStore.routerStore.routerState.params.id;
        this.grantService = new GrantService(rootStore.app.baasic.apiClient);
        this.grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.feeService = new FeeService(rootStore.app.baasic.apiClient);
        this.rootStore = rootStore;

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.getGrant();
        await this.getDonorAccount();
        await this.initializeForm();
        await this.setStores();
        await this.calculateFee();
    }

    @action.bound async loadLookups() {
        const grantPurposeTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'grant-purpose-type');
        const grantPurposeTypeModels = await grantPurposeTypeLookupService.getAll();
        this.grantPurposeTypes = _.orderBy(grantPurposeTypeModels.data, ['sortOrder'], ['asc']);

        const grantAcknowledgmentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'grant-acknowledgment-type');
        const grantAcknowledgmentTypeModels = await grantAcknowledgmentTypeLookupService.getAll();
        this.grantAcknowledgmentTypes = _.orderBy(grantAcknowledgmentTypeModels.data, ['sortOrder'], ['asc']);

        const feeTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'fee-type');
        const feeTypeModels = await feeTypeLookupService.getAll();
        this.feeTypes = _.orderBy(feeTypeModels.data, ['sortOrder'], ['asc']);
    }

    @action.bound async initializeForm() {
        const fields = GrantUpdateFormFields(this.inMemoryOf, this.inHonorOf, this.sponsorAFriendId, 0, this.donorAccount, this.grant);
        this.form = new FormBase({
            onSuccess: async (form) => {
                this.loaderStore.suspend();
                const item = form.values();
                if (!(item.grantPurposeTypeId === this.inMemoryOfId || item.grantPurposeTypeId === this.inHonorOfId || item.grantPurposeTypeId === this.sponsorAFriendId)) {
                    item.grantPurposeMember = null;
                }

                try {
                    const response = await this.grantService.update(item);
                    this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
                    this.rootStore.routerStore.navigate('master.app.administration.grant.list');
                } catch (errorResponse) {
                    this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
                    this.loaderStore.resume();
                    return;
                }
                this.loaderStore.resume();
            }
        }, fields);
    }

    @action.bound async setStores() {
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => this.form.$('grantPurposeTypeId').set('value', option ? option.id : null)
            },
            this.grantPurposeTypes
        );

        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => this.form.$('grantAcknowledgmentTypeId').set('value', option ? option.id : null)
            },
            this.grantAcknowledgmentTypes
        );

        this.charityDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false,
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'charityAddresses,address' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.charityService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getCharityNameDropdown(x) } });
                },
                onChange: (option) => this.form.$('charityId').set('value', option ? option.id : null)
            }
        );

        if (this.grant.charityId) {
            let params = {};
            params.embed = ['charityAddresses,address'];
            const charity = await this.charityService.get(this.grant.charityId, params);
            let defaultSearchCharity = { id: charity.id, name: getCharityNameDropdown(charity) }
            let charitySearchs = [];
            charitySearchs.push(defaultSearchCharity);
            this.charityDropdownStore.items = charitySearchs;
        }
    }

    @action.bound async getGrant() {
        let params = {};
        params.embed = 'grantPurposeMember'
        this.grant = await this.grantService.get(this.id, params);
        this.userId = this.grant.donorAccountId;
    }

    @action.bound async getDonorAccount() {
        let params = {};
        params.embed = 'donorAccountAddresses,address'
        this.donorAccount = await this.donorAccountService.get(this.userId, params)
    }

    @action.bound async calculateFee() {
        if (this.form.$('amount').value && this.form.$('amount').isValid) {
            let params = {};
            params.id = this.userId;
            params.feeTypeId = _.find(this.feeTypes, { abrv: 'grant-fee' }).id;
            params.amount = this.form.$('amount').value;
            const feeAmount = await this.feeService.calculateFee(params);
            this.totalAmount = Number(params.amount) + feeAmount;
        }
        else {
            this.totalAmount = 0;
        }
    }

    @computed get inMemoryOfId() {
        return this.grantPurposeTypes ? _.find(this.grantPurposeTypes, { abrv: 'in-memory-of' }).id : null;
    }

    @computed get inHonorOfId() {
        return this.grantPurposeTypes ? _.find(this.grantPurposeTypes, { abrv: 'in-honor-of' }).id : null;
    }

    @computed get sponsorAFriendId() {
        return this.grantPurposeTypes ? _.find(this.grantPurposeTypes, { abrv: 'sponsor-a-friend' }).id : null;
    }

    @computed get otherId() {
        return this.grantPurposeTypes ? _.find(this.grantPurposeTypes, { abrv: 'other' }).id : null;
    }

    @computed get charityEventId() {
        return this.grantPurposeTypes ? _.find(this.grantPurposeTypes, { abrv: 'charity-event' }).id : null;
    }

    @computed get membershipId() {
        return this.grantPurposeTypes ? _.find(this.grantPurposeTypes, { abrv: 'membership' }).id : null;
    }

    @computed get nonBindingPledgeId() {
        return this.grantPurposeTypes ? _.find(this.grantPurposeTypes, { abrv: 'non-binding-pledge' }).id : null;
    }

    @computed get fundNameAndAddressId() {
        return this.grantAcknowledgmentTypes ? _.find(this.grantAcknowledgmentTypes, { abrv: 'fund-name-and-address' }).id : null;
    }

    @computed get fundNameId() {
        return this.grantAcknowledgmentTypes ? _.find(this.grantAcknowledgmentTypes, { abrv: 'fund-name' }).id : null;
    }
}

export default GrantEditViewStore;