import { action, runInAction, observable } from 'mobx';
import { applicationContext } from 'core/utils';
import { ScheduledGrantEditForm } from 'application/scheduled-grant/forms';
import { ScheduledGrantService } from 'application/scheduled-grant/services';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { LookupService, FeeService } from 'common/services';
import { CharityService } from 'application/charity/services';
import _ from 'lodash';
import moment from 'moment';

@applicationContext
class ScheduledGrantEditViewStore extends BaseEditViewStore {
    grantScheduleTypes = null;
    grantPurposeTypes = null;
    grantAcknowledgmentTypes = null;
    applicationDefaultSetting = null;
    feeTypes = null;
    @observable amountWithFee = null;
    @observable donorName = null;
    donorAccount = null;

    constructor(rootStore) {
        const service = new ScheduledGrantService(rootStore.application.baasic.apiClient);
        const editId = rootStore.routerStore.routerState.params.editId;
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'scheduled-grant-edit',
            id: editId,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        if (resource.endDate == 'Invalid date') {
                            resource.endDate = null;
                        }

                        if (this.grantPurposeTypeDropdownStore.value.abrv === 'in-honor-of' ||
                            this.grantPurposeTypeDropdownStore.value.abrv === 'in-memory-of' ||
                            this.grantPurposeTypeDropdownStore.value.abrv === 'sponsor-a-friend') {
                            resource.charityEventAttending = null;
                            resource.additionalInformation = null;
                        }
                        else if (this.grantPurposeTypeDropdownStore.value.abrv === 'other') {
                            resource.purposeMemberName = null;
                            resource.charityEventAttending = null;
                        }
                        else if (this.grantPurposeTypeDropdownStore.value.abrv === 'charity-event') {
                            resource.additionalInformation = null;
                            resource.purposeMemberName = null;
                        }
                        else {
                            resource.additionalInformation = null;
                            resource.purposeMemberName = null;
                            resource.charityEventAttending = null;
                        }
                        return await service.update({ id: this.editId, ...resource });
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'grantScheduleType',
                                'grantPurposeType',
                                'charity',
                                'grantAcknowledgmentType',
                                'donorAccount',
                                'donorAccount.coreUser',
                                'donorAccount.companyProfile',
                                'donorAccount.donorAccountAddresses',
                                'donorAccount.donorAccountAddresses.address'
                            ]
                        }
                        let response = await service.get(id, params);
                        return response.data;
                    }
                }
            },
            FormClass: ScheduledGrantEditForm,
        });

        this.editId = editId;
        this.id = id;
        const charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.feeService = new FeeService(rootStore.application.baasic.apiClient);

        this.grantScheduleTypeDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: () => {
                    this.form.$('startFutureDate').clear()
                }
            });
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: () => {
                    this.form.$('purposeMemberName').setRequired(false);
                    this.form.$('additionalInformation').setRequired(false);
                    if (this.grantPurposeTypeDropdownStore.value.abrv === 'in-honor-of' ||
                        this.grantPurposeTypeDropdownStore.value.abrv === 'in-memory-of' ||
                        this.grantPurposeTypeDropdownStore.value.abrv === 'sponsor-a-friend') {
                        this.form.$('purposeMemberName').setRequired(true);
                    }
                    else if (this.grantPurposeTypeDropdownStore.value.abrv === 'other') {
                        this.form.$('additionalInformation').setRequired(true);
                    }

                }
            });
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore();
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
            this.form.clear();
            await this.fetch([
                this.fetchGrantPurposeTypes(),
                this.fetchGrantAcknowledgmentTypes(),
                this.fetchGrantScheduleTypes(),
                this.fetchApplicationDefaultSetting(),
                this.fetchFeeTypes()
            ]);

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);

            await this.getResource(this.editId);
            if (moment(this.item.startFutureDate).isSameOrBefore(moment())) {
                this.rootStore.notificationStore.warning('Cannot edit scheduled grant. It already started.');
                this.rootStore.routerStore.goTo('master.app.main.scheduled-grant.list');
            }
            this.donorAccount = this.item.donorAccount;
            this.grantAcknowledgmentTypeDropdownStore.onChange(this.item.grantAcknowledgmentType);
            this.grantPurposeTypeDropdownStore.onChange(this.item.grantPurposeType);
            this.grantScheduleTypeDropdownStore.setValue(this.item.grantScheduleType);
            this.charityDropdownStore.onChange(this.item.charity);
            this.form.validate();
            this.onChangeAmount();
            if (this.item.numberOfPayments) {
                this.onChangeNumberOfPayments()
            }
            else if (this.item.endDate) {
                this.onChangeEndDate()
            }
            else if (this.item.noEndDate) {
                this.onChangeNoEndDate()
            }
        }
    }

    @action.bound
    setFormDefaultRules() {
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
        }
    }

    @action.bound
    setFormDefaultValues() {
        this.form.$('donorAccountId').set(this.id);
    }

    @action.bound
    async onChangeAmount() {
        if (this.form.$('amount').value && this.form.$('amount').isValid) {
            let params = {};
            params.id = this.id;
            params.feeTypeId = _.find(this.feeTypes, { abrv: 'grant-fee' }).id;
            params.amount = this.form.$('amount').value;
            const feeAmount = await this.feeService.calculateFee(params);
            this.amountWithFee = params.amount + feeAmount;

            if (this.form.$('amount').value < this.applicationDefaultSetting.grantMinimumRegularAmount) {
                //combined
                this.form.$('grantAcknowledgmentTypeId').set(this.applicationDefaultSetting.grantAcknowledgmentTypeId);
                this.form.$('grantPurposeTypeId').set(this.applicationDefaultSetting.grantPurposeTypeId);
                this.grantAcknowledgmentTypeDropdownStore.onChange(_.find(this.grantAcknowledgmentTypes, { id: this.applicationDefaultSetting.grantAcknowledgmentTypeId }));
                this.grantPurposeTypeDropdownStore.onChange(_.find(this.grantPurposeTypes, { id: this.applicationDefaultSetting.grantPurposeTypeId }));
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
    async fetchGrantPurposeTypes() {
        this.grantPurposeTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-purpose-type');
        const response = await service.getAll();
        this.grantPurposeTypes = response.data;
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
        this.grantAcknowledgmentTypes = response.data;
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

export default ScheduledGrantEditViewStore;
