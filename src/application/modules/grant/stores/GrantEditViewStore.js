import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore, TableViewStore } from 'core/stores';
import { applicationContext, donorFormatter } from 'core/utils';
import { GrantEditForm } from 'application/grant/forms';
import { charityFormatter } from 'core/utils';
import { ModalParams } from 'core/models';

@applicationContext
class GrantCreateViewStore extends BaseEditViewStore {
    @observable isNoteToAdministratorIncluded = false;
    @observable amountWithFee = false;
    @observable grantAcknowledgmentName = null;
    feeTypes = [];
    donor = null;
    applicationDefaultSetting = {};
    grantScheduleTypes = [];
    grantAcknowledgmentTypes = [];
    grantPurposeTypes = [];

    constructor(rootStore) {
        super(rootStore, {
            name: 'grant-create',
            id: rootStore.routerStore.routerState.params.editId,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        resource.donorId = this.item.donorId;
                        resource.id = this.id;

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

                            resource.charityId = await this.rootStore.application.grant.grantStore.suggest(charity);//charityId
                        }

                        await this.rootStore.application.grant.grantStore.update(resource);
                    },
                    get: async (id) => {
                        return this.rootStore.application.grant.grantStore.getDetails(id, { embed: 'donationStatus,charity,charity.charityAddresses' });
                    }
                }
            },
            FormClass: GrantEditForm
        });

        this.hasAdministratorsPermission = this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')
        if (!this.hasAdministratorsPermission) {
            this.donorId = rootStore.userStore.user.id;
        }

        this.createCharityDropdownStore();
        this.createCharityTypeDropdownStore();
        this.createGrantPurposeTypeDropdownStore();
        this.createGrantAcknowledgmentTypeDropdownStore();
        this.createPreviousGrantsTableStore();
        this.createSimilarGrantsTableStore();

        this.advancedSearchModal = new ModalParams({});
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource(this.id),
                this.loadLookups()
            ]);
            await this.setDonor();

            if (!this.donor.isInitialContributionDone) {
                if (!this.hasAdministratorsPermission) {
                    this.rootStore.notificationStore.warning('Missing Initial Contribution. You Are Redirected On Contribution Page.');
                    this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: this.donor.id });
                }
            }

            this.charityDropdownStore.setValue({
                id: this.item.charityId,
                name: charityFormatter.format(this.item.charity, { value: 'charity-name-display' }),
                item: this.item.charity
            })
            this.setGrantAcknowledgmentTypeName(this.form.$('grantAcknowledgmentTypeId').value);
            this.setPreviousGrantsTableStore(this.item.charityId);
            this.setSimilarGrantsTableStore(this.item.grantPurposeTypeId);
            this.setAmount(this.item.amount);

            this.form.$('isNewCharity').observe(({ field }) => {
                this.onNewCharityChange(field.value)
            });
            this.form.$('grantAcknowledgmentTypeId').observe(({ field }) => {
                this.onGrantAcknowledgmentTypeChange(field.value)
            });
            this.form.$('grantPurposeTypeId').observe(({ field }) => {
                this.onGrantPurposeTypeChange(field.value)
            });
            this.form.$('charityId').observe(({ field }) => {
                this.onCharityChange(field.value)
            });
            this.form.$('amount').onBlur = (event) => {
                this.onBlurAmount(event.target.value)
            };
        }
    }

    @action.bound
    onGrantPurposeTypeChange(value) {
        this.setSimilarGrantsTableStore(value);
    }

    setSimilarGrantsTableStore(value) {
        this.similarGrantsTableStore.setData(this.donor.similarGrants.filter(c => c.grantPurposeTypeId === value));
        if (!this.similarGrantsTableStore.dataInitialized) {
            this.similarGrantsTableStore.dataInitialized = true;
        }
    }

    @action.bound
    onNewCharityChange(value) {
        this.form.$('charityId').clear();
        this.form.$('charityId').setDisabled(value);
        this.charityDropdownStore.setValue(null);
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
    onGrantAcknowledgmentTypeChange(value) {
        this.setGrantAcknowledgmentTypeName(value);
    }

    setGrantAcknowledgmentTypeName(value) {
        this.grantAcknowledgmentName = value ? donorFormatter.format(this.donor, { type: 'grant-acknowledgment-type', value: this.grantAcknowledgmentTypes.find(c => c.id === value).abrv })
            : this.grantAcknowledgmentName = null
    }

    @action.bound
    async onBlurAmount(value) {
        this.setAmount(value);
    }

    async setAmount(value) {
        if (!this.item.isGrantFeePayedByCharity) {
            if (value) {
                const params = {
                    id: this.donor.id,
                    feeTypeId: this.feeTypes.find((item) => item.abrv === 'grant-fee').id,
                    amount: value,
                }
                const feeAmount = await this.rootStore.application.grant.grantStore.calculateFee(params);
                this.amountWithFee = params.amount + feeAmount;

                if (value < this.applicationDefaultSetting.grantMinimumRegularAmount) { //combined
                    this.form.$('grantAcknowledgmentTypeId').setDisabled(true);
                    this.form.$('grantAcknowledgmentTypeId').set(this.applicationDefaultSetting.grantAcknowledgmentTypeId);
                    this.grantAcknowledgmentTypeDropdownStore.setValue(this.grantAcknowledgmentTypes.find((item) => item.id === this.applicationDefaultSetting.grantAcknowledgmentTypeId));

                    this.form.$('grantPurposeTypeId').setDisabled(true);
                    this.form.$('grantPurposeTypeId').set(this.applicationDefaultSetting.grantPurposeTypeId);
                    this.grantPurposeTypeDropdownStore.setValue(this.grantPurposeTypes.find((item) => item.id === this.applicationDefaultSetting.grantPurposeTypeId));

                    this.form.$('grantAcknowledgmentTypeId').validate({ showErrors: true });
                    this.form.$('grantPurposeTypeId').validate({ showErrors: true });
                }
                else { //regular
                    this.form.$('grantAcknowledgmentTypeId').setDisabled(false);
                    this.form.$('grantPurposeTypeId').setDisabled(false);
                }
            }
            else {
                this.amountWithFee = null;
                this.form.$('grantAcknowledgmentTypeId').setDisabled(false);
                this.form.$('grantPurposeTypeId').setDisabled(false);
            }
        }
    }

    @action.bound
    async onCharityChange(value) {
        this.setPreviousGrantsTableStore(value)
    }

    async setPreviousGrantsTableStore(value) {
        let data = [];
        if (value) {
            const params = {
                donorId: this.donor.id,
                embed: [
                    'donationStatus'
                ],
                fields: [
                    'id',
                    'amount',
                    'dateCreated'
                ],
                charityId: value
            }
            data = await this.rootStore.application.grant.grantStore.findGrants(params);
        }
        this.previousGrantsTableStore.setData(data.item)
        if (!this.previousGrantsTableStore.dataInitialized) {
            this.previousGrantsTableStore.dataInitialized = true;
        }
    }

    @action.bound
    async setDonor() {
        this.donor = await this.rootStore.application.grant.grantStore.getDonorInformation(this.item.donorId);
    }

    async loadLookups() {
        this.feeTypes = await this.rootStore.application.lookup.feeTypeStore.find();
        this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
        this.grantAcknowledgmentTypes = await this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
        this.grantPurposeTypes = await this.rootStore.application.lookup.grantPurposeTypeStore.find();
    }

    createGrantPurposeTypeDropdownStore() {
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantPurposeTypeStore.find();
                }
            });
    }

    createGrantAcknowledgmentTypeDropdownStore() {
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
                },
            });
    }

    createCharityTypeDropdownStore() {
        this.charityTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.charityTypeStore.find();
                },
            });
    }

    createCharityDropdownStore() {
        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.CREATE.FIELDS.SELECT_CHARITY',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.grant.grantStore.searchCharity({
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
                    return data.map(x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' }),
                            item: x
                        }
                    });
                }
            });
    }

    createPreviousGrantsTableStore() {
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
    }

    createSimilarGrantsTableStore() {
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
}

export default GrantCreateViewStore;
