import { action, observable, computed } from 'mobx';
import { GrantService, DonorAccountService, LookupService, CharityService, FeeService, GrantScheduledPaymentService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { getCharityNameDropdown } from 'core/utils';
import _ from 'lodash';

class BaseGrantCreateViewStore extends BaseEditViewStore {
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

    constructor(rootStore, config) {
        super(rootStore, config.createViewStore)

        this.userId = config.userId;
        this.grantService = new GrantService(rootStore.app.baasic.apiClient);
        this.grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.feeService = new FeeService(rootStore.app.baasic.apiClient);
        this.rootStore = rootStore;
    }

    @action.bound async load() {
        await this.fetch([
            this.loadLookups(),
            this.getDonorAccount()
        ]);

        await this.setStores();
        await this.setFormDefaults();
    }

    @action.bound async loadLookups() {
        const grantPurposeTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'grant-purpose-type');
        const grantPurposeTypeModels = await grantPurposeTypeLookupService.getAll();
        this.grantPurposeTypes = _.orderBy(grantPurposeTypeModels.data, ['sortOrder'], ['asc']);

        const grantAcknowledgmentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'grant-acknowledgment-type');
        const grantAcknowledgmentTypeModels = await grantAcknowledgmentTypeLookupService.getAll();
        this.grantAcknowledgmentTypes = _.orderBy(grantAcknowledgmentTypeModels.data, ['sortOrder'], ['asc']);

        const grantScheduleTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'grant-schedule-type');
        const grantScheduleTypeModels = await grantScheduleTypeLookupService.getAll();
        this.grantScheduleTypes = _.orderBy(grantScheduleTypeModels.data, ['sortOrder'], ['asc']);

        const feeTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'fee-type');
        const feeTypeModels = await feeTypeLookupService.getAll();
        this.feeTypes = _.orderBy(feeTypeModels.data, ['sortOrder'], ['asc']);
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

        this.grantScheduleTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => this.form.$('grantScheduleTypeId').set('value', option ? option.id : null)
            },
            this.grantScheduleTypes
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
    }

    @action.bound async getDonorAccount() {
        let params = {};
        params.embed = 'donorAccountAddresses,address'
        this.donorAccount = await this.donorAccountService.get(this.userId, params);
    }

    @action.bound setFormDefaults() {
        //Rules
        this.form.$('grantPurposeMember.firstName').set('rules', this.form.$('grantPurposeMember.firstName').rules + `|required_if:grantPurposeTypeId,${this.inMemoryOfId}|required_if:grantPurposeTypeId,${this.inHonorOfId}|required_if:grantPurposeTypeId,${this.sponsorAFriendId}`);
        this.form.$('grantPurposeMember.lastName').set('rules', this.form.$('grantPurposeMember.lastName').rules + `|required_if:grantPurposeTypeId,${this.inMemoryOfId}|required_if:grantPurposeTypeId,${this.inHonorOfId}|required_if:grantPurposeTypeId,${this.sponsorAFriendId}`);
        this.form.$('startFutureDate').set('rules', this.form.$('startFutureDate').rules + `|required_if:grantScheduleTypeId,${this.monthlyId}|required_if:grantScheduleTypeId,${this.annualId}`);

        //Values
        this.form.$('donorAccountId').set('value', this.donorAccount.id);
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

    @computed get oneTimeId() {
        return this.grantScheduleTypes ? _.find(this.grantScheduleTypes, { abrv: 'one-time' }).id : null;
    }

    @computed get monthlyId() {
        return this.grantScheduleTypes ? _.find(this.grantScheduleTypes, { abrv: 'monthly' }).id : null;
    }

    @computed get annualId() {
        return this.grantScheduleTypes ? _.find(this.grantScheduleTypes, { abrv: 'annual' }).id : null;
    }
}

export default BaseGrantCreateViewStore;