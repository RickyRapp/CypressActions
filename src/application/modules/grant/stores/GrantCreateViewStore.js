import { action, runInAction, computed } from 'mobx';
import { BaasicDropdownStore } from 'core/stores';
import { LookupService } from 'common/services';
import { applicationContext } from 'core/utils';
import { GrantCreateForm } from 'application/grant/forms';
import { GrantService, GrantRequestService } from 'application/grant/services';
import { ScheduledGrantService } from 'application/grant/services';
import GrantBaseViewStore from './GrantBaseViewStore'
import _ from 'lodash';
import moment from 'moment';

@applicationContext
class GrantCreateViewStore extends GrantBaseViewStore {
    constructor(rootStore) {
        const service = new GrantService(rootStore.application.baasic.apiClient);
        const scheduledGrantService = new ScheduledGrantService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'grant-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        if (resource.endDate == 'Invalid date') {
                            resource.endDate = null;
                        }
                        this.onBlurAmount();
                        if (!this.form.isValid) {
                            throw { data: { message: "There is a problem with form." } };
                        }
                        if (resource.grantScheduleTypeId &&
                            (moment(resource.startFutureDate) > moment() || resource.grantScheduleTypeId === this.monthlyGrantId || resource.grantScheduleTypeId === this.annualGrantId)) {
                            this.scheduledGrant = true;
                            await scheduledGrantService.create(resource);
                        }
                        else {
                            this.scheduledGrant = false;
                            await service.create(resource);
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

            if (this.grantRequestId) {
                await this.fetchGrantRequest();
            }

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);
        }
    }

    @action.bound
    setFormDefaultValues() {
        this.form.$('donorId').set(this.donorId);
        this.form.$('accountTypeId').set(this.donor.accountTypeId);

        this.donorName = this.donor.donorName;
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
            this.grantScheduleTypeDropdownStore.setItems(response.data);
            this.grantScheduleTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchGrantRequest() {
        if (this.grantRequestId) {
            const service = new GrantRequestService(this.rootStore.application.baasic.apiClient);
            let response = null;
            try {
                response = await service.get(this.grantRequestId, { embed: ['charity'] });
            } catch (err) {
                this.rootStore.notificationStore.warning('Grant request does not exist.');
                return;
            }
            this.form.$('amount').set(response.data.amount);
            this.onCharitySelected(response.data.charity)
            this.form.$('grantScheduleTypeId').set(this.oneTimeGrantId);
            this.form.$('startFutureDate').set(moment().toDate());
            this.grantAcknowledgmentTypeDropdownStore.setValue(_.find(this.grantAcknowledgmentTypeDropdownStore.items, { abrv: 'remain-anonymous' }));
            this.form.$('grantAcknowledgmentTypeId').set(this.grantAcknowledgmentTypeDropdownStore.value.id);
            this.grantPurposeTypeDropdownStore.setValue(_.find(this.grantPurposeTypeDropdownStore.items, { abrv: 'where-deemed-most-needed' }));
            this.form.$('grantPurposeTypeId').set(this.grantPurposeTypeDropdownStore.value.id);
            this.form.$('grantRequestId').set(this.grantRequestId);

            this.form.$('charityId').validate();
            this.form.$('charityId').setDisabled(true);
            this.form.$('grantScheduleTypeId').validate();
            this.form.$('grantScheduleTypeId').setDisabled(true);
            this.form.$('startFutureDate').validate();
            this.form.$('startFutureDate').setDisabled(true);
        }
    }

    @computed get oneTimeGrantId() {
        return this.grantScheduleTypes ? _.find(this.grantScheduleTypes, { abrv: 'one-time' }).id : null;
    }

    @computed get monthlyGrantId() {
        return this.grantScheduleTypes ? _.find(this.grantScheduleTypes, { abrv: 'monthly' }).id : null;
    }

    @computed get annualGrantId() {
        return this.grantScheduleTypes ? _.find(this.grantScheduleTypes, { abrv: 'annual' }).id : null;
    }
}

export default GrantCreateViewStore;
