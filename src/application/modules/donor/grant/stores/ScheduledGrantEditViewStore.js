import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore, TableViewStore } from 'core/stores';
import { addressFormatter, applicationContext, donorFormatter } from 'core/utils';
import { GrantEditForm } from 'application/donor/grant/forms';
import { charityFormatter } from 'core/utils';
import { ModalParams } from 'core/models';

@applicationContext
class ScheduledGrantEditViewStore extends BaseEditViewStore {
	@observable isNoteToAdministratorIncluded = false;
	@observable grantAcknowledgmentName = null;
	@observable isChangedDefaultAddress = null;
	donor = null;
	applicationDefaultSetting = {};
	grantAcknowledgmentTypes = [];
	grantPurposeTypes = [];

	constructor(rootStore) {
		super(rootStore, {
			name: 'grant-edit',
			id: rootStore.routerStore.routerState.params.id,
			autoInit: false,
			actions: () => {
				return {
					update: async resource => {
						resource.donorId = this.item.donorId;

						if (resource.isNewCharity) {
							const charity = {
								name: resource.charityName,
								taxId: resource.charityTaxId,
								dba: resource.charityDba,
								charityTypeId: resource.charityCharityTypeId,
								address: {
									addressLine1: resource.charityAddressLine1,
									addressLine2: resource.charityAddressLine2,
									city: resource.charityCity,
									state: resource.charityState,
									zipCode: resource.charityZipCode,
								},
								contactInformation: {
									name: resource.charityContactName,
									email: resource.charityContactEmail,
									number: resource.charityContactNumber,
								},
							};

							const charityData = await this.rootStore.application.grant.grantStore.suggest(charity); //charityId
							resource.charityId = charityData.charityId;
						}

						await this.rootStore.application.grant.grantStore.updateScheduledGrant(resource);
					},
					get: async id => {
						return this.rootStore.application.grant.grantStore.getScheduledGrant(id, {
							embed: 'charity,charity.charityAddresses',
						});
					},
				};
			},
			FormClass: GrantEditForm,
		});

		this.hasAdministratorsPermission = this.rootStore.permissionStore.hasPermission(
			'theDonorsFundAdministrationSection.read'
		);

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
		} else {
			await this.fetch([this.getResource(this.id), this.loadLookups()]);
			if (this.item.done) {
				this.rootStore.notificationStore.warning('ERROR_CODE.3011');
				this.rootStore.routerStore.goBack();
			}

			await this.setDonor();

			this.charityDropdownStore.setValue({
				id: this.item.charityId,
				name: charityFormatter.format(this.item.charity, { value: 'charity-name-display' }),
				item: this.item.charity,
			});
			this.setGrantAcknowledgmentName(this.form.$('grantAcknowledgmentTypeId').value);
			this.setPreviousGrantTable(this.item.charityId);
			this.setSimilarGrantTable(this.item.grantPurposeTypeId);
			this.setAmount(this.item.amount);

			const formattedCharityAddress = addressFormatter.format(
				this.item.charity.charityAddresses.find(c => {
					return c.isPrimary === true;
				}),
				'full'
			);
			const formattedGrantAddress = addressFormatter.format(this.item, 'full');
			this.isChangedDefaultAddress = formattedCharityAddress !== formattedGrantAddress;

			this.setFormDefaultRules();
			this.form.$('isNewCharity').observe(({ field }) => {
				this.onNewCharityChange(field.value);
			});
			this.form.$('grantAcknowledgmentTypeId').observe(({ field }) => {
				this.onGrantAcknowledgmentTypeChange(field.value);
			});
			this.form.$('grantPurposeTypeId').observe(({ field }) => {
				this.onGrantPurposeTypeChange(field.value);
			});
			this.form.$('charityId').observe(({ field }) => {
				this.onCharityChange(field.value);
			});
			this.form.$('amount').onBlur = event => {
				this.onBlurAmount(event.target.value);
			};
			this.form.$('charityAddressLine1').observe(({ field }) => {
				this.form.$('addressLine1').set(field.value);
			});
			this.form.$('charityAddressLine2').observe(({ field }) => {
				this.form.$('addressLine2').set(field.value);
			});
			this.form.$('charityState').observe(({ field }) => {
				this.form.$('state').set(field.value);
			});
			this.form.$('charityCity').observe(({ field }) => {
				this.form.$('city').set(field.value);
			});
			this.form.$('charityZipCode').observe(({ field }) => {
				this.form.$('zipCode').set(field.value);
			});
		}
	}

	@action.bound
	onGrantPurposeTypeChange(value) {
		this.setSimilarGrantTable(value);
	}

	@action.bound
	onNewCharityChange(value) {
		this.form.$('charityId').clear();
		this.form.$('charityId').setDisabled(value);
		this.charityDropdownStore.setValue(null);
		this.isChangedDefaultAddress = false;
		this.form.$('addressLine1').set('');
		this.form.$('addressLine2').set('');
		this.form.$('city').set('');
		this.form.$('state').set('');
		this.form.$('zipCode').set('');
	}

	@action.bound
	async onBlurAmount(value) {
		this.setAmount(value);
	}

	async setAmount(value) {
		if (value) {
			if (value < this.applicationDefaultSetting.grantMinimumRegularAmount) {
				//combined
				this.form.$('grantAcknowledgmentTypeId').setDisabled(true);
				this.form.$('grantAcknowledgmentTypeId').set(this.applicationDefaultSetting.grantAcknowledgmentTypeId);
				this.grantAcknowledgmentTypeDropdownStore.setValue(
					this.grantAcknowledgmentTypes.find(
						item => item.id === this.applicationDefaultSetting.grantAcknowledgmentTypeId
					)
				);

				this.form.$('grantPurposeTypeId').setDisabled(true);
				this.form.$('grantPurposeTypeId').set(this.applicationDefaultSetting.grantPurposeTypeId);
				this.grantPurposeTypeDropdownStore.setValue(
					this.grantPurposeTypes.find(item => item.id === this.applicationDefaultSetting.grantPurposeTypeId)
				);

				this.form.$('grantAcknowledgmentTypeId').validate({ showErrors: true });
				this.form.$('grantPurposeTypeId').validate({ showErrors: true });
			} else {
				//regular
				this.form.$('grantAcknowledgmentTypeId').setDisabled(false);
				this.form.$('grantPurposeTypeId').setDisabled(false);
			}
		} else {
			this.amountWithFee = null;
			this.form.$('grantAcknowledgmentTypeId').setDisabled(false);
			this.form.$('grantPurposeTypeId').setDisabled(false);
		}
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
		this.setGrantAcknowledgmentName(value);
	}

	@action.bound
	setFormDefaultRules() {
		if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
			this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
		}
	}

	@action.bound
	async onCharityChange(value) {
		this.setPreviousGrantTable(value);
	}

	async setPreviousGrantTable(value) {
		let data = [];
		if (value) {
			const donationTypes = await this.rootStore.application.lookup.donationTypes.find();
			const visibleDonations = ['online', 'grant-request', 'giving-card', 'charity-website']
			const params = {
				donorId: this.item.donorId,
				embed: ['donationStatus'],
				fields: ['id', 'amount', 'dateCreated'],
				charityId: value,
				donationTypeIds: donationTypes.filter(c => visibleDonations.includes(c.abrv)).map(c => c.id).join(',')
			};
			data = await this.rootStore.application.grant.grantStore.findGrants(params);
		}
		if (data) {
			this.previousGrantsTableStore.setData(data.item);
			if (!this.previousGrantsTableStore.dataInitialized) {
				this.previousGrantsTableStore.dataInitialized = true;
			}
		}
	}

	@action.bound
	async setDonor() {
		this.donor = await this.rootStore.application.grant.grantStore.getDonorInformation(this.item.donorId);
	}

	@action.bound
	async onCharitySelected(charity) {
		this.charityDropdownStore.setValue({
			id: charity.id,
			name: charityFormatter.format(charity, { value: 'charity-name-display' }),
			item: charity,
		});
		this.form.$('charityId').set(charity.id);
		const address = charity.charityAddresses.find(c => c.isPrimary);
		this.setAddress(address);
		this.advancedSearchModal.close();
	}

	@action.bound
	async onChangeDefaultAddressClick() {
		this.isChangedDefaultAddress = !this.isChangedDefaultAddress;
		if (!this.isChangedDefaultAddress && this.charityDropdownStore.value) {
			const address = this.charityDropdownStore.value.item.charityAddresses.find(c => c.isPrimary);
			this.setAddress(address);
		}
	}

	@action.bound
	setSimilarGrantTable(value) {
		this.similarGrantsTableStore.setData(this.donor.similarGrants.filter(c => c.grantPurposeTypeId === value));
		if (!this.similarGrantsTableStore.dataInitialized) {
			this.similarGrantsTableStore.dataInitialized = true;
		}
	}

	@action.bound
	setGrantAcknowledgmentName(value) {
		if (value)
			this.grantAcknowledgmentName = donorFormatter.format(this.donor, {
				type: 'grant-acknowledgment-type',
				value: this.grantAcknowledgmentTypes.find(c => c.id === value).abrv,
			});
		else this.grantAcknowledgmentName = null;
	}

	setAddress(address) {
		this.form.$('addressLine1').set(address.addressLine1);
		this.form.$('addressLine2').set(address.addressLine2);
		this.form.$('city').set(address.city);
		this.form.$('state').set(address.state);
		this.form.$('zipCode').set(address.zipCode);
	}

	async loadLookups() {
		this.feeTypes = await this.rootStore.application.lookup.feeTypeStore.find();
		this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
		this.grantAcknowledgmentTypes = await this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
		this.grantPurposeTypes = await this.rootStore.application.lookup.grantPurposeTypeStore.find();
	}

	createGrantPurposeTypeDropdownStore() {
		this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return this.rootStore.application.lookup.grantPurposeTypeStore.find();
			},
		});
	}

	createGrantAcknowledgmentTypeDropdownStore() {
		this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
			},
		});
	}

	createCharityTypeDropdownStore() {
		this.charityTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return this.rootStore.application.lookup.charityTypeStore.find();
			},
		});
	}

	createCharityDropdownStore() {
		this.charityDropdownStore = new BaasicDropdownStore(
			{
				placeholder: 'GRANT.CREATE.FIELDS.SELECT_CHARITY',
				initFetch: false,
				filterable: true,
			},
			{
				fetchFunc: async searchQuery => {
					const data = await this.rootStore.application.grant.grantStore.searchCharity({
						pageNumber: 1,
						pageSize: 10,
						search: searchQuery,
						sort: 'name|asc',
						embed: ['charityAddresses'],
						fields: ['id', 'taxId', 'name', 'charityAddresses'],
					});
					return data.item.map(x => {
						return {
							id: x.id,
							name: charityFormatter.format(x, { value: 'charity-name-display' }),
							item: x,
						};
					});
				},
				onChange: value => {
					if (value) {
						const address = this.charityDropdownStore.value.item.charityAddresses.find(c => c.isPrimary);
						this.setAddress(address);
					}
				},
			}
		);
	}

	createPreviousGrantsTableStore() {
		this.previousGrantsTableStore = new TableViewStore(null, {
			columns: [
				{
					key: 'dateCreated',
					title: 'GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
					format: {
						type: 'date',
						value: 'short',
					},
				},
				{
					key: 'amount',
					title: 'GRANT.LIST.COLUMNS.AMOUNT_LABEL',
					format: {
						type: 'currency',
						value: '$',
					},
				},
			],
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
						value: 'short',
					},
				},
				{
					key: 'amount',
					title: 'GRANT.LIST.COLUMNS.AMOUNT_LABEL',
					format: {
						type: 'currency',
						value: '$',
					},
				},
			],
		});
	}
}

export default ScheduledGrantEditViewStore;
