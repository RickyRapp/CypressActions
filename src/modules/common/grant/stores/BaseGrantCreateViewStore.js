import { action, observable, computed } from 'mobx';
import { DonorAccountService, LookupService, CharityService, FeeService, GrantScheduledPaymentService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { getCharityNameDropdown, getCharityDropdownOptions } from 'core/utils';
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
    @observable applicationDefaultSetting = 0;

    constructor(rootStore, config) {
        super(rootStore, config.createViewStore)

        this.userId = config.userId;
        this.grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.feeService = new FeeService(rootStore.app.baasic.apiClient);
        this.grantPurposeTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');
        this.grantAcknowledgmentTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'grant-acknowledgment-type');
        this.grantScheduleTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'grant-schedule-type');
        this.feeTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'fee-type');
        this.applicationDefaultSettingLookupService = new LookupService(rootStore.app.baasic.apiClient, 'application-default-setting');

        this.rootStore = rootStore;
    }

    @action.bound async load() {
        await this.fetch([
            this.loadLookups(),
            this.getDonorAccount()
        ]);

        this.setStores();
        await this.setFormDefaults();
    }

    @action.bound async loadLookups() {
        const grantPurposeTypeModels = await this.grantPurposeTypeLookupService.getAll();
        this.grantPurposeTypes = _.orderBy(grantPurposeTypeModels.data, ['sortOrder'], ['asc']);

        const grantAcknowledgmentTypeModels = await this.grantAcknowledgmentTypeLookupService.getAll();
        this.grantAcknowledgmentTypes = _.orderBy(grantAcknowledgmentTypeModels.data, ['sortOrder'], ['asc']);

        const grantScheduleTypeModels = await this.grantScheduleTypeLookupService.getAll();
        this.grantScheduleTypes = _.orderBy(grantScheduleTypeModels.data, ['sortOrder'], ['asc']);

        const feeTypeModels = await this.feeTypeLookupService.getAll();
        this.feeTypes = _.orderBy(feeTypeModels.data, ['sortOrder'], ['asc']);

        const applicationDefaultSettingModels = await this.applicationDefaultSettingLookupService.getAll();
        this.applicationDefaultSetting = applicationDefaultSettingModels.data[0];
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
                    let options = getCharityDropdownOptions;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.charityService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getCharityNameDropdown(x) } });
                }
            }
        );
    }

    @action.bound async getDonorAccount() {
        let params = {};
        params.embed = ['donorAccountAddresses', 'donorAccountAddresses.address'];
        params.fields = [
            'id',
            'availableBalance',
            'lineOfCredit',
            'grantFee',
            'grantMinimumAmount',
            'fundName',
            'donorAccountAddresses',
            'donorAccountAddresses.primary',
            'donorAccountAddresses.address',
            'donorAccountAddresses.address.addressLine1',
            'donorAccountAddresses.address.addressLine2',
            'donorAccountAddresses.address.city',
            'donorAccountAddresses.address.state',
            'donorAccountAddresses.address.zipCode'
        ];
        this.donorAccount = await this.donorAccountService.get(this.userId, params);
    }

    @action.bound setFormDefaults() {
        //Rules
        this.form.$('purposeMemberName').set('rules', this.form.$('purposeMemberName').rules + `|required_if:grantPurposeTypeId,${this.inMemoryOfId}|required_if:grantPurposeTypeId,${this.inHonorOfId}|required_if:grantPurposeTypeId,${this.sponsorAFriendId}`);
        this.form.$('startFutureDate').set('rules', this.form.$('startFutureDate').rules + `|required_if:grantScheduleTypeId,${this.monthlyId}|required_if:grantScheduleTypeId,${this.annualId}`);

        //Values
        this.form.$('donorAccountId').set('value', this.donorAccount.id);
    }

    @action.bound async onChangeAmount() {
        if (this.form.$('amount').value && this.form.$('amount').isValid) {
            let params = {};
            params.id = this.userId;
            params.feeTypeId = _.find(this.feeTypes, { abrv: 'grant-fee' }).id;
            params.amount = this.form.$('amount').value;
            const feeAmount = await this.feeService.calculateFee(params);
            this.totalAmount = Number(params.amount) + feeAmount;

            if (this.form.$('amount').value < this.applicationDefaultSetting.grantMinimumRegularAmount) {
                //combined
                this.form.$('grantAcknowledgmentTypeId').set('value', this.applicationDefaultSetting.grantAcknowledgmentTypeId);
                this.form.$('grantPurposeTypeId').set('value', this.applicationDefaultSetting.grantPurposeTypeId);
                this.form.$('grantAcknowledgmentTypeId').set('disabled', true);
                this.form.$('grantAcknowledgmentTypeId').resetValidation();
                this.form.$('grantPurposeTypeId').set('disabled', true);
                this.form.$('grantPurposeTypeId').resetValidation();
            }
            else { //regular
                this.form.$('grantAcknowledgmentTypeId').set('disabled', false);
                this.form.$('grantAcknowledgmentTypeId').resetValidation();
                this.form.$('grantPurposeTypeId').set('disabled', false);
                this.form.$('grantPurposeTypeId').resetValidation();
            }
        }
        else {
            this.totalAmount = 0;
        }
    }

    @computed get isFutureGrant() {
        if (this.form.$('grantScheduleTypeId').value === this.monthlyId ||
            this.form.$('grantScheduleTypeId').value === this.annualId ||
            (this.form.$('grantScheduleTypeId').value === this.oneTimeId && (this.form.$('startFutureDate').value ? this.form.$('startFutureDate').value.toLocaleDateString() : null) > (new Date()).toLocaleDateString())) {
            return true;
        }
        return false;
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

    @computed get remainAnonymousId() {
        return this.grantAcknowledgmentTypes ? _.find(this.grantAcknowledgmentTypes, { abrv: 'remain-anonymous' }).id : null;
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