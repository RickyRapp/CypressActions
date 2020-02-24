import { action, runInAction, computed } from 'mobx';
import { BaasicDropdownStore } from 'core/stores';
import { LookupService } from 'common/services';
import { applicationContext, charityFormatter } from 'core/utils';
import { GrantCreateForm } from 'application/grant/forms';
import { GrantService } from 'application/grant/services';
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
                    this.rootStore.routerStore.goTo('master.app.main.grant.list', null, { tab: 1 }) :
                    this.rootStore.routerStore.goTo('master.app.main.grant.list')
            }
        });
        this.grantScheduleTypeDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorAccount(),
                this.fetchGrantScheduleTypes(),
                this.fetchApplicationDefaultSetting(),
                this.fetchFeeTypes()
            ]);

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);
        }
    }

    @action.bound
    setFormDefaultValues() {
        this.form.$('donorAccountId').set(this.donorAccountId);
        this.form.$('accountTypeId').set(this.donorAccount.accountTypeId);

        this.donorName = this.donorAccount.donorName;
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
    async onScanned(result) {
        if (result) {
            const response = await this.charityService.search({
                pageNumber: 1,
                pageSize: 10,
                search: result.replace('-', ''),
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
            if (response.data && response.data.item && response.data.item.length === 1) {
                const item = _.map(response.data.item, x => {
                    return {
                        id: x.id,
                        name: charityFormatter.format(x, { value: 'charity-name-display' }),
                        item: x
                    }
                })[0];
                this.charityDropdownStore.setValue({ id: item.id, name: charityFormatter.format(item, { value: 'charity-name-display' }), item: item });
                this.form.$('charityId').set(item.id);
            }
            else {
                this.rootStore.notificationStore.warning('Charity does not exist.');
            }
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
