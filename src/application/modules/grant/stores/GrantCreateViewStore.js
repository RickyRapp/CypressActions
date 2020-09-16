import { action, runInAction, computed, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore, TableViewStore } from 'core/stores';
import { LookupService, FeeService } from 'common/services';
import { applicationContext } from 'core/utils';
import { GrantCreateForm } from 'application/grant/forms';
import { GrantService } from 'application/grant/services';
import { ScheduledGrantService } from 'application/grant/services';
import moment from 'moment';
import { CharityService } from 'application/charity/services';
import { charityFormatter } from 'core/utils';
import { ModalParams } from 'core/models';

@applicationContext
class GrantCreateViewStore extends BaseEditViewStore {
    @observable isNoteToAdministratorIncluded = false;

    constructor(rootStore) {
        const scheduledGrantService = new ScheduledGrantService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'grant-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        resource.donorId = this.donorId;

                        if (resource.endDate == 'Invalid date') {
                            resource.endDate = null;
                        }
                        this.onBlurAmount();
                        if (!this.form.isValid) {
                            throw { data: { message: "There is a problem with form." } };
                        }

                        if (resource.isNewCharity) {
                            const charity = {
                                name: resource.charityName,
                                taxId: resource.charityTaxId,
                                dba: resource.charityDba,
                                charityTypeId: resource.charityCharityTypeId,
                                isInternationalCharity: resource.charityIsInternationalCharity,
                                address: {
                                    addressLine1: resource.charityAddressLine1,
                                    addressLine2: resource.charityAddressLine2,
                                    city: resource.charityCity,
                                    state: resource.charityState,
                                    zipCode: resource.charityZipCode
                                },
                                contactInformation: {
                                    name: resource.charityContactName,
                                    email: resource.charityContactEmail,
                                    number: resource.charityContactNumber
                                }
                            }

                            const charityResponse = await this.charityService.suggest(charity);
                            resource.charityId = charityResponse.data.response; //charityId
                        }

                        if (moment(resource.startFutureDate) > moment() || this.isRecurring === true) {
                            this.scheduledGrant = true;
                            await scheduledGrantService.create(resource);
                        }
                        else {
                            this.scheduledGrant = false;
                            await this.service.create(resource);
                        }
                    }
                }
            },
            FormClass: GrantCreateForm,
            onAfterAction: () => {
                this.scheduledGrant ?
                    this.rootStore.routerStore.goTo('master.app.main.grant.tab', null, { tab: 1 }) :
                    this.rootStore.routerStore.goTo('master.app.main.grant.tab')
            }
        });
        this.grantScheduleTypeDropdownStore = new BaasicDropdownStore();

        if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.grantRequestId) {
            this.grantRequestId = rootStore.routerStore.routerState.queryParams.grantRequestId;
        }

        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.donorId = rootStore.routerStore.routerState.params.id;
        }
        else {
            this.donorId = rootStore.userStore.user.id;
        }
        this.service = new GrantService(rootStore.application.baasic.apiClient);
        this.feeService = new FeeService(rootStore.application.baasic.apiClient);
        this.charityService = new CharityService(rootStore.application.baasic.apiClient);

        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-purpose-type');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (grantPurposeTypeId) => {
                    this.similarGrantsTableStore.setData(this.donor.similarGrants.filter(c => c.grantPurposeTypeId === grantPurposeTypeId))
                }
            });
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-acknowledgment-type');
                    const response = await service.getAll();
                    return response.data;
                },
            });
        this.charityTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-type');
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
                    const response = await this.charityService.search({
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
                    return response.data.item.map(x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' }),
                            item: x
                        }
                    });
                },
                onChange: () => {
                    this.onBlurAmount();
                    this.fetchDonorGrantsToCharity();
                }
            });

        this.advancedSearchModal = new ModalParams({});

        this.previousGrantsTableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'amount',
                    title: 'GRANT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ]
        });

        this.similarGrantsTableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'amount',
                    title: 'GRANT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ]
        });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonor(),
                this.fetchGrantScheduleTypes(),
                this.fetchApplicationDefaultSetting(),
                this.fetchFeeTypes()
            ]);

            await this.fetch([
                this.setFormDefaultRules()
            ]);
        }
    }

    @action.bound
    onChangeEndDate() {
        if (this.form.$('endDate').value && this.form.$('endDate').isValid) {
            this.form.$('numberOfPayments').set('disabled', true);
            this.form.$('noEndDate').set('disabled', true);
        }
        else {
            this.form.$('numberOfPayments').set('disabled', false);
            this.form.$('noEndDate').set('disabled', false);
        }
    }

    @action.bound
    onChangeNumberOfPayments() {
        if (this.form.$('numberOfPayments').value && this.form.$('numberOfPayments').isValid) {
            this.form.$('endDate').set('disabled', true);
            this.form.$('noEndDate').set('disabled', true);
        }
        else {
            this.form.$('endDate').set('disabled', false);
            this.form.$('noEndDate').set('disabled', false);
        }
    }

    @action.bound
    onChangeNoEndDate() {
        if (this.form.$('noEndDate').value && this.form.$('noEndDate').isValid) {
            this.form.$('numberOfPayments').set('disabled', true);
            this.form.$('endDate').set('disabled', true);
        }
        else {
            this.form.$('numberOfPayments').set('disabled', false);
            this.form.$('endDate').set('disabled', false);
        }
    }

    @action.bound
    async fetchGrantScheduleTypes() {
        this.grantScheduleTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-schedule-type');
        const response = await service.getAll();
        this.grantScheduleTypes = response.data;
        runInAction(() => {
            this.grantScheduleTypeDropdownStore.setItems(response.data.filter(c => c.abrv != 'one-time'));
            this.grantScheduleTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    onNewCharityChange() {
        this.form.$('charityId').setDisabled(this.form.$('isNewCharity').value);
        this.form.$('charityId').clear();
        this.charityDropdownStore.setValue(null);
    }

    @action.bound
    onRecurringChange() {
        this.form.$('startFutureDate').setDisabled(this.form.$('isRecurring').value);
    }

    @action.bound
    onIncludeNoteToAdministratorChange(checked) {
        this.isNoteToAdministratorIncluded = checked;
    }

    @action.bound
    openAdvancedSearchModal() {
        this.advancedSearchModal.open();
    }

    @action.bound
    setFormDefaultRules() {
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
        }
        else {
            if (this.donor.isInitialContributionDone) {
                this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${this.donor.grantMinimumAmount}`);
            }
            else {
                this.rootStore.notificationStore.warning('Missing Initial Contribution. You Are Redirected On Contribution Page.');
                this.rootStore.routerStore.goTo(
                    'master.app.main.contribution.create',
                    { id: this.donorId }
                );
                return;
            }
        }
    }

    @action.bound
    async onBlurAmount() {
        if (this.form.$('amount').value) {
            let params = {};
            params.id = this.donorId;
            params.feeTypeId = this.feeTypes.find((item) => item.abrv === 'grant-fee').id;
            params.amount = this.form.$('amount').value;
            const feeAmount = await this.feeService.calculateFee(params);
            this.amountWithFee = params.amount + feeAmount;

            if (this.form.$('amount').value < this.applicationDefaultSetting.grantMinimumRegularAmount) {
                //combined
                this.form.$('grantAcknowledgmentTypeId').set(this.applicationDefaultSetting.grantAcknowledgmentTypeId);
                this.form.$('grantPurposeTypeId').set(this.applicationDefaultSetting.grantPurposeTypeId);
                this.grantAcknowledgmentTypeDropdownStore.onChange(this.grantAcknowledgmentTypeDropdownStore.items.find((item) => item.id === this.applicationDefaultSetting.grantAcknowledgmentTypeId));
                this.grantPurposeTypeDropdownStore.onChange(this.grantPurposeTypeDropdownStore.items.find((item) => item.id === this.applicationDefaultSetting.grantPurposeTypeId));
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
    async fetchDonorGrantsToCharity() {
        if (this.form.$('charityId').value) {
            const service = new GrantService(this.rootStore.application.baasic.apiClient);
            const params = {
                embed: [
                    'donationStatus'
                ],
                fields: [
                    'id',
                    'amount',
                    'dateCreated'
                ],
                charityId: this.form.$('charityId').value
            }
            if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
                params.donorId = this.donorId;
            }
            else {
                params.userId = this.donorId;
            }
            const response = await service.find(params);
            this.previousGrantsTableStore.setData(response.data.item)
        }
    }

    @action.bound
    async fetchDonor() {
        const response = await this.service.getDonorInformation(this.donorId);
        this.donor = response.data;
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

    @action.bound
    onCharitySelected(item) {
        this.charityDropdownStore.setValue({ id: item.id, name: charityFormatter.format(item, { value: 'charity-name-display' }), item: item });
        this.form.$('charityId').set(item.id);
        this.onBlurAmount();
        this.fetchDonorGrantsToCharity();
        this.advancedSearchModal.close();
    }

    @computed get oneTimeGrantId() {
        return this.grantScheduleTypes ? this.grantScheduleTypes.find((item) => item.abrv === 'one-time').id : null;
    }

    @computed get monthlyGrantId() {
        return this.grantScheduleTypes ? this.grantScheduleTypes.find((item) => item.abrv === 'monthly').id : null;
    }

    @computed get annualGrantId() {
        return this.grantScheduleTypes ? this.grantScheduleTypes.find((item) => item.abrv === 'annual').id : null;
    }
}

export default GrantCreateViewStore;
