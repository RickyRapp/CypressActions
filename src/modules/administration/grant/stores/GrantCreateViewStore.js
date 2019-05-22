import { action, observable, computed } from 'mobx';
import { GrantCreateFormFields } from 'modules/common/grant/forms';
import { GrantService, DonorAccountService, LookupService, CharityService } from "common/data";
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { FormBase } from 'core/components';
import _ from 'lodash';

class GrantCreateViewStore extends BaseViewStore {
    @observable grantPurposeTypes = null;
    @observable grantAcknowledgmentTypes = null;
    @observable grantTypes = null;
    @observable grantPurposeTypeDropdownStore = null;
    @observable grantAcknowledgmentTypeDropdownStore = null;
    @observable grantTypeDropdownStore = null;
    @observable charityDropdownStore = null;
    @observable form = null;
    @observable donorAccount = null;

    constructor(rootStore) {
        super(rootStore)

        this.userId = rootStore.routerStore.routerState.params.userId;
        this.grantService = new GrantService(rootStore.app.baasic.apiClient);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.rootStore = rootStore;

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.getDonorAccount();
        await this.initializeForm();
        await this.setStores();
    }

    @action.bound async loadLookups() {
        let grantPurposeTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'grant-purpose-type');
        let grantPurposeTypeModels = await grantPurposeTypeLookupService.getAll();
        this.grantPurposeTypes = _.orderBy(grantPurposeTypeModels.data, ['sortOrder'], ['asc']);

        let grantAcknowledgmentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'grant-acknowledgment-type');
        let grantAcknowledgmentTypeModels = await grantAcknowledgmentTypeLookupService.getAll();
        this.grantAcknowledgmentTypes = _.orderBy(grantAcknowledgmentTypeModels.data, ['sortOrder'], ['asc']);

        let grantTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'grant-type');
        let grantTypeModels = await grantTypeLookupService.getAll();
        this.grantTypes = _.orderBy(_.filter(grantTypeModels.data, function (x) { return x.abrv !== 'immediate' }), ['sortOrder'], ['asc']);
    }

    @action.bound async initializeForm() {
        const fields = GrantCreateFormFields(this.inMemoryOf, this.inHonorOf, this.sponsorAFriendId, this.otherId, 0, this.donorAccount);
        this.form = new FormBase({
            onSuccess: async (form) => {
                this.form.setFieldsDisabled(true);
                const item = form.values();
                if (!(item.grantPurposeTypeId === this.inMemoryOfId || item.grantPurposeTypeId === this.inHonorOfId || item.grantPurposeTypeId === this.sponsorAFriendId)) {
                    item.grantPurposeMember = null;
                }
                let response = null;
                try {
                    response = await this.grantService.create(item);
                    this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
                    console.log(response.data.response)
                    this.rootStore.routerStore.navigate('master.app.administration.grant.list');
                } catch (errorResponse) {
                    this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
                    this.form.setFieldsDisabled(false);
                    return;
                }
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

        this.grantTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => this.form.$('grantTypeId').set('value', option ? option.id : null)
            },
            this.grantTypes
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
                    let options = { page: 1, rpp: 15, embed: 'coreUser' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.charityService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: x.name } });
                },
                onChange: (option) => this.form.$('charityId').set('value', option ? option.id : null)
            }
        );
    }

    @action.bound async getDonorAccount() {
        let params = {};
        params.embed = 'donorAccountAddresses,address'
        this.donorAccount = await this.donorAccountService.get(this.userId, params)
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

    @computed get futureId() {
        return this.grantTypes ? _.find(this.grantTypes, { abrv: 'future' }).id : null;
    }

    @computed get recurringMonthlyId() {
        return this.grantTypes ? _.find(this.grantTypes, { abrv: 'recurring-monthly' }).id : null;
    }

    @computed get recurringAnnualId() {
        return this.grantTypes ? _.find(this.grantTypes, { abrv: 'recurring-annual' }).id : null;
    }
}

export default GrantCreateViewStore;