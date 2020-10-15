import { action, runInAction, computed, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore, TableViewStore } from 'core/stores';
import { LookupService, FeeService } from 'common/services';
import { applicationContext, isNullOrUndefinedOrEmpty } from 'core/utils';
import { GrantEditForm } from 'application/grant/forms';
import { GrantService } from 'application/grant/services';
import moment from 'moment';
import { CharityService } from 'application/charity/services';
import { charityFormatter } from 'core/utils';
import { ModalParams } from 'core/models';

@applicationContext
class GrantCreateViewStore extends BaseEditViewStore {
    @observable isNoteToAdministratorIncluded = false;
    @observable amountWithFee = false;

    constructor(rootStore) {
        super(rootStore, {
            name: 'grant-create',
            id: rootStore.routerStore.routerState.params.editId,
            autoInit: false,
            actions: () => {
                const service = new GrantService(rootStore.application.baasic.apiClient);
                return {
                    update: async (resource) => {
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

                        await service.update({ id: this.id, ...resource });
                    },
                    get: async (id) => {
                        const service = new GrantService(rootStore.application.baasic.apiClient);
                        const response = await service.getDetails(id, { embed: 'donationStatus,charity,charity.charityAddresses', donorId: this.donorId });
                        return response.data;

                    }
                }
            },
            FormClass: GrantEditForm,
            onAfterAction: () => {
                this.rootStore.routerStore.goTo('master.app.main.activity.grants')
            }
        });

        this.hasAdministratorsPermission = this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')
        if (!this.hasAdministratorsPermission) {
            this.donorId = rootStore.userStore.user.id;
        }
        else {
            this.donorId = rootStore.routerStore.routerState.queryParams.donorId;
        }

        this.feeService = new FeeService(rootStore.application.baasic.apiClient);
        this.charityService = new CharityService(rootStore.application.baasic.apiClient);

        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: () => {
                    return this.rootStore.application.lookup.grantPurposeTypeStore.find();
                },
                onChange: (value) => {
                    this.onGrantPurposeTypeChange(value)
                }
            });
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: () => {
                    return this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
                },
            });
        this.charityTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: () => {
                    return this.rootStore.application.lookup.charityTypeStore.find();
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
                super.getResource(this.id),
                this.setDonor(),
                this.fetchApplicationDefaultSetting(),
                this.fetchFeeTypes()
            ])

            if (this.hasAdministratorsPermission) {
                this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
            }
            else {
                if (this.donor.isInitialContributionDone) {
                    this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${this.donor.grantMinimumAmount}`);
                }
                else {
                    this.rootStore.notificationStore.warning('Missing Initial Contribution. You Are Redirected On Contribution Page.');
                    this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: this.donorId });
                    return;
                }
            }

            const dateToEdit = moment(this.item.dateCreated).add(15, 'm');
            if (!moment().isBetween(moment(this.item.dateCreated), dateToEdit)) {
                if (!this.hasAdministratorsPermission) {
                    this.rootStore.notificationStore.warning('ERROR_CODE.5005')
                    this.rootStore.routerStore.goBack();
                }
            }
            if (this.item.donationStatus.abrv != 'pending') {
                this.rootStore.notificationStore.warning('ERROR_CODE.5028')
                this.rootStore.routerStore.goBack();
            }

            if (!this.hasAdministratorsPermission) {
                this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${this.donor.grantMinimumAmount}`);
            }
            else {
                this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
            }

            if (!this.donor.isInitialContributionDone) {
                if (!this.hasAdministratorsPermission) {
                    this.rootStore.notificationStore.warning('Missing Initial Contribution. You Are Redirected On Contribution Page.');
                    this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: this.donorId });
                    return;
                }
            }

            this.isNoteToAdministratorIncluded = !isNullOrUndefinedOrEmpty(this.item.noteToAdministrator);
            this.similarGrantsTableStore.setData(this.donor.similarGrants.filter(c => c.grantPurposeTypeId === this.item.grantPurposeTypeId));
            this.fetchDonorGrantsToCharity();
            this.onBlurAmount();
        }
    }

    @action.bound
    onNewCharityChange() {
        this.form.$('charityId').clear();
        this.form.$('charityId').setDisabled(this.form.$('isNewCharity').value);
        this.charityDropdownStore.setValue(null);
    }

    @action.bound
    onGrantPurposeTypeChange(grantPurposeTypeId) {
        this.similarGrantsTableStore.setData(this.donor.similarGrants.filter(c => c.grantPurposeTypeId === grantPurposeTypeId))
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
    async onBlurAmount() {
        if (this.form.$('amount').value) {
            const params = {};
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
            if (this.hasAdministratorsPermission) {
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
    async setDonor() {
        const service = new GrantService(this.rootStore.application.baasic.apiClient);
        const response = await service.getDonorInformation(this.donorId);
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
}

export default GrantCreateViewStore;
