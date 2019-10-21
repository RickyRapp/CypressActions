import { action, runInAction, computed, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { GrantService } from 'application/grant/services';
import { LookupService } from 'common/services';
import { applicationContext } from 'core/utils';
import { CharityService } from 'application/charity/services';
import { DonorAccountService } from 'application/donor-account/services';
import { GrantCreateForm } from 'application/grant/forms';
import _ from 'lodash';

@applicationContext
class GrantCreateViewStore extends BaseEditViewStore {
    @observable grantScheduleTypes = null;
    @observable donorName = '';

    constructor(rootStore) {
        const service = new GrantService(rootStore.application.baasic.apiClient);
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'grant-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        return await service.create(resource);
                    }
                }
            },
            FormClass: GrantCreateForm,
        });

        this.id = id;
        this.service = service;
        const charityService = new CharityService(rootStore.application.baasic.apiClient);

        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore();
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore();
        this.grantScheduleTypeDropdownStore = new BaasicDropdownStore();
        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.CREATE.FIELDS.SELECT_CHARITY',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await charityService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                            'charityAddresses.address'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.name } });
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
                this.fetchGrantPurposeTypes(),
                this.fetchGrantAcknowledgmentTypes(),
                this.fetchGrantScheduleTypes()
            ]);

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);
        }
    }

    @action.bound
    setFormDefaultRules() {
        this.form.$('accountTypeId').set(this.donorAccount.accountTypeId);
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');

            this.donorName = this.donorAccount.donorName;
        }
        else {
            if (this.donorAccount.initialContribution) {
                this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${grantMinimumAmount}`);
            }
            else {
                this.rootStore.routerStore.goTo(
                    'master.app.main.contribution.create',
                    { id: this.donorAccount.id }
                );
            }
        }
    }

    @action.bound
    setFormDefaultValues() {
        this.form.$('donorAccountId').set(this.id);
    }

    @action.bound
    async fetchDonorAccount() {
        const service = new DonorAccountService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(this.id, {
            embed: [
                'coreUser',
                'companyProfile',
                'donorAccountAddresses',
                'donorAccountAddresses.address'
            ],
            fields: [
                'id',
                'donorName',
                'accountTypeId',
                'availableBalance',
                'initialContribution',
                'lineOfCredit',
                'grantFee',
                'grantMinimumAmount',
                'fundName',
                'donorAccountAddresses'
            ]
        });
        this.donorAccount = response.data;
    }

    @action.bound
    async fetchGrantPurposeTypes() {
        this.grantPurposeTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-purpose-type');
        const response = await service.getAll();
        runInAction(() => {
            this.grantPurposeTypeDropdownStore.setItems(response.data);
            this.grantPurposeTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchGrantAcknowledgmentTypes() {
        this.grantAcknowledgmentTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-acknowledgment-type');
        const response = await service.getAll();
        runInAction(() => {
            this.grantAcknowledgmentTypeDropdownStore.setItems(response.data);
            this.grantAcknowledgmentTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchGrantScheduleTypes() {
        this.grantScheduleTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-schedule-type');
        const response = await service.getAll();
        this.grantScheduleTypes = response.data;
        runInAction(() => {
            this.grantScheduleTypeDropdownStore.setItems(response.data);
            this.grantScheduleTypeDropdownStore.setLoading(false);
        });
    }

    @computed get oneTimeId() {
        return this.grantScheduleTypes ? _.find(this.grantScheduleTypes, { abrv: 'one-time' }).id : null;
    }

    @computed get monthlyGrantId() {
        return this.grantScheduleTypes ? _.find(this.grantScheduleTypes, { abrv: 'monthly' }).id : null;
    }

    @computed get annualGrantId() {
        return this.grantScheduleTypes ? _.find(this.grantScheduleTypes, { abrv: 'annual' }).id : null;
    }

    @computed get isOneTimeGrant() {
        return this.form.$('grantScheduleTypeId').value === this.oneTimeId
            && this.form.$('startFutureDate').value
            && this.form.$('startFutureDate').value.toLocaleDateString() === (new Date()).toLocaleDateString();
    }

    @computed get isFutureGrant() {
        return this.form.$('grantScheduleTypeId').value === this.oneTimeId
            && this.form.$('startFutureDate').value
            && this.form.$('startFutureDate').value.toLocaleDateString() > (new Date()).toLocaleDateString();
    }

    @computed get isMonthlyGrant() {
        return this.form.$('grantScheduleTypeId').value === this.monthlyId && (this.form.$('endDate').value
            || this.form.$('numberOfPayments').value
            || this.form.$('noEndDate').value);
    }

    @computed get isAnnualGrant() {
        return this.form.$('grantScheduleTypeId').value === this.annualId && (this.form.$('endDate').value
            || this.form.$('numberOfPayments').value
            || this.form.$('noEndDate').value);
    }
}

export default GrantCreateViewStore;
