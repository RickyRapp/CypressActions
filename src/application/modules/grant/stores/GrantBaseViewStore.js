import { action, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { LookupService, FeeService } from 'common/services';
import { CharityService } from 'application/charity/services';
import { DonorAccountService } from 'application/donor-account/services';
import { charityFormatter } from 'core/utils';
import _ from 'lodash';

class GrantBaseViewStore extends BaseEditViewStore {
    @observable grantScheduleTypes = null;
    @observable donorName = '';
    applicationDefaultSetting = null;
    feeTypes = null;
    @observable amountWithFee = null;

    constructor(rootStore, config) {
        super(rootStore, config);

        this.donorAccountId = rootStore.routerStore.routerState.params.id;
        const charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.feeService = new FeeService(rootStore.application.baasic.apiClient);

        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-purpose-type');
                    const response = await service.getAll();
                    return response.data;
                },
            });
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-acknowledgment-type');
                    const response = await service.getAll();
                    return response.data;
                },
            });
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
                            'charityAccountType'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name',
                            'charityAccountType',
                            'charityAddresses'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: charityFormatter.format(x, { value: 'charity-name-display' }), item: x } });
                },
                onChange: () => {
                    this.onBlurAmount();
                }
            });
    }

    @action.bound
    setFormDefaultRules() {
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
        }
        else {
            if (this.donorAccount.isInitialContributionDone) {
                this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${this.donorAccount.grantMinimumAmount}`);
            }
            else {
                this.rootStore.notificationStore.warning('Missing Initial Contribution. You Are Redirected On Contribution Page.');
                this.rootStore.routerStore.goTo(
                    'master.app.main.contribution.create',
                    { id: this.donorAccountId }
                );
                return;
            }
        }
    }

    @action.bound
    async onBlurAmount() {
        if (this.form.$('amount').value) {
            if (this.form.$('charityId').value) {
                if (this.charityDropdownStore.value && this.charityDropdownStore.value.item) {
                    if (this.charityDropdownStore.value.item.charityAccountType.abrv === 'regular') {
                        if (this.form.$('amount').value < 100) {
                            this.form.$('amount').invalidate('Amount cannot be less than $100 for this charity.')
                            this.amountWithFee = null;
                            return;
                        }
                    }
                    else if (this.charityDropdownStore.value.item.charityAccountType.abrv === 'advanced') {
                        if (this.form.$('amount').value < 25) {
                            this.form.$('amount').invalidate('Amount cannot be less than $25 for this charity.')
                            this.amountWithFee = null;
                            return;
                        }
                    }
                }
            }

            let params = {};
            params.id = this.donorAccountId;
            params.feeTypeId = _.find(this.feeTypes, { abrv: 'grant-fee' }).id;
            params.amount = this.form.$('amount').value;
            const feeAmount = await this.feeService.calculateFee(params);
            this.amountWithFee = params.amount + feeAmount;

            if (this.form.$('amount').value < this.applicationDefaultSetting.grantMinimumRegularAmount) {
                //combined
                this.form.$('grantAcknowledgmentTypeId').set(this.applicationDefaultSetting.grantAcknowledgmentTypeId);
                this.form.$('grantPurposeTypeId').set(this.applicationDefaultSetting.grantPurposeTypeId);
                this.grantAcknowledgmentTypeDropdownStore.onChange(_.find(this.grantAcknowledgmentTypeDropdownStore.items, { id: this.applicationDefaultSetting.grantAcknowledgmentTypeId }));
                this.grantPurposeTypeDropdownStore.onChange(_.find(this.grantPurposeTypeDropdownStore.items, { id: this.applicationDefaultSetting.grantPurposeTypeId }));
                this.form.$('grantAcknowledgmentTypeId').set('disabled', true);
                this.form.$('grantAcknowledgmentTypeId').resetValidation();
                this.form.$('grantPurposeTypeId').set('disabled', true);
                this.form.$('grantPurposeTypeId').resetValidation();
            }
            else { //regular
                this.form.$('grantAcknowledgmentTypeId').set('disabled', false);
                this.form.$('grantPurposeTypeId').set('disabled', false);
            }
        }
        else {
            this.amountWithFee = null;
        }
    }

    @action.bound
    async fetchDonorAccount() {
        const service = new DonorAccountService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(this.donorAccountId, {
            embed: [
                'donorAccountAddresses'
            ],
            fields: [
                'id',
                'donorName',
                'accountTypeId',
                'availableBalance',
                'isInitialContributionDone',
                'lineOfCredit',
                'grantFeePercentage',
                'grantMinimumAmount',
                'fundName',
                'donorAccountAddresses'
            ]
        });
        this.donorAccount = response.data;
    }

    @action.bound
    async fetchApplicationDefaultSetting() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'application-default-setting');
        const response = await service.getAll();
        this.applicationDefaultSetting = response.data[0];
    }

    @action.bound
    async fetchFeeTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'fee-type');
        const response = await service.getAll();
        this.feeTypes = response.data;
    }
}

export default GrantBaseViewStore;
