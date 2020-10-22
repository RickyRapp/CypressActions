import { action, runInAction, observable } from 'mobx';
import { applicationContext, charityFormatter } from 'core/utils';
import { ScheduledGrantEditForm } from 'application/grant/forms';
import { ScheduledGrantService } from 'application/grant/services';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { FeeService } from 'common/services';
import { CharityService } from 'application/charity/services';
import _ from 'lodash';
import moment from 'moment';
import { ModalParams } from 'core/models';

@applicationContext
class ScheduledGrantEditViewStore extends BaseEditViewStore {
    grantScheduleTypes = null;
    grantPurposeTypes = null;
    grantAcknowledgmentTypes = null;
    applicationDefaultSetting = null;
    feeTypes = null;
    @observable amountWithFee = null;
    @observable donorName = null;
    donor = null;

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
                                'donor',
                                'donor.donorAddresses'
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
        this.charityService = new CharityService(rootStore.application.baasic.apiClient);
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
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' }),
                            item: x
                        }
                    });
                }
            });
        this.advancedSearchModal = new ModalParams({});
    }

    @action.bound
    openAdvancedSearchModal() {
        this.advancedSearchModal.open();
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
                this.rootStore.routerStore.goTo('master.app.main.grant.tab', null, { tab: 1 });
            }
            this.donor = this.item.donor;
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
        this.form.$('donorId').set(this.id);
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
        this.form.$('numberOfPayments').set('disabled', this.form.$('endDate').value && this.form.$('endDate').isValid);
        this.form.$('numberOfPayments').resetValidation();
        this.form.$('noEndDate').set('disabled', this.form.$('endDate').value && this.form.$('endDate').isValid);
        this.form.$('noEndDate').resetValidation();
    }

    @action.bound
    onChangeNumberOfPayments() {
        this.form.$('endDate').set('disabled', this.form.$('numberOfPayments').value && this.form.$('numberOfPayments').isValid);
        this.form.$('endDate').resetValidation();
        this.form.$('noEndDate').set('disabled', this.form.$('numberOfPayments').value && this.form.$('numberOfPayments').isValid);
        this.form.$('noEndDate').resetValidation();
    }

    @action.bound
    onChangeNoEndDate() {
        this.form.$('numberOfPayments').set('disabled', this.form.$('noEndDate').value && this.form.$('noEndDate').isValid);
        this.form.$('numberOfPayments').resetValidation();
        this.form.$('endDate').set('disabled', this.form.$('noEndDate').value && this.form.$('noEndDate').isValid);
        this.form.$('endDate').resetValidation();
    }

    @action.bound
    async fetchGrantPurposeTypes() {
        this.grantPurposeTypeDropdownStore.setLoading(true);
        this.grantPurposeTypes = await this.rootStore.application.lookup.grantPurposeTypeStore.find();
        runInAction(() => {
            this.grantPurposeTypeDropdownStore.setItems(this.grantPurposeTypes);
            this.grantPurposeTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchGrantAcknowledgmentTypes() {
        this.grantAcknowledgmentTypeDropdownStore.setLoading(true);
        this.grantAcknowledgmentTypes = await this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
        runInAction(() => {
            this.grantAcknowledgmentTypeDropdownStore.setItems(this.grantAcknowledgmentTypes);
            this.grantAcknowledgmentTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchGrantScheduleTypes() {
        this.grantScheduleTypeDropdownStore.setLoading(true);
        this.grantScheduleTypes = await this.rootStore.application.lookup.grantScheduleTypeStore.find();
        runInAction(() => {
            this.grantScheduleTypeDropdownStore.setItems(this.grantScheduleTypes);
            this.grantScheduleTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchApplicationDefaultSetting() {
        this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
    }

    @action.bound
    async fetchFeeTypes() {
        this.feeTypes = await this.rootStore.application.lookup.feeTypeStore.find();
    }
}

export default ScheduledGrantEditViewStore;
