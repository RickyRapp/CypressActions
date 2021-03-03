import { action, computed, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore, TableViewStore } from 'core/stores';
import { applicationContext, donorFormatter, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { GrantCreateForm } from 'application/common/grant/forms';
import moment from 'moment';
import { charityFormatter } from 'core/utils';
import { ModalParams } from 'core/models';

@applicationContext
class GrantCreateViewStore extends BaseEditViewStore {
	@observable isNoteToAdministratorIncluded = false;
	@observable grantAcknowledgmentName = null;
	@observable isChangedDefaultAddress = null;
	donor = null;
	applicationDefaultSetting = {};
	grantScheduleTypes = [];
	grantAcknowledgmentTypes = [];
	grantPurposeTypes = [];
	grantRequestId = null;

	constructor(rootStore, { donorId, grantStore }) {
		super(rootStore, {
			name: 'grant-create',
			id: undefined,
			autoInit: false,
			actions: () => {
				return {
					create: async resource => {
						resource.donorId = this.donorId;

						if (!isNullOrWhiteSpacesOrUndefinedOrEmpty(this.grantRequestId)) {
							await this.grantStore.createGrantRequest({ grantRequestId: this.grantRequestId, ...resource });
						} else {
							if (resource.isNewCharity) {
								const charity = {
									name: resource.charityName,
									taxId: resource.charityTaxId,
									dba: resource.charityDba,
									charityTypeId: resource.charityTypeId,
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

								const charityData = await this.grantStore.suggest(charity); //charityId,bankAccountId
								resource.charityId = charityData.charityId;
							}

							if (moment(resource.startFutureDate) > moment() || resource.isRecurring === true) {
								await this.grantStore.createScheduledGrant(resource);
							} else {
								await this.grantStore.createGrant(resource);
							}
						}
					},
				};
			},
			FormClass: GrantCreateForm,
		});

		this.donorId = donorId;
		this.grantStore = grantStore;

		if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.grantRequestId) {
			this.grantRequestId = rootStore.routerStore.routerState.queryParams.grantRequestId;
		}

		this.createCharityDropdownStore();
		this.createCharityTypeDropdownStore();
		this.createGrantPurposeTypeDropdownStore();
		this.createGrantScheduleTypeDropdownStore();
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
			await this.fetch([this.setDonor()]);
			await this.fetch([this.loadLookups()]);

			this.form.$('amount').set('rules', `${this.form.$('amount').rules}|max:${(this.donor.presentBalance + this.donor.lineOfCredit) < 0 ? 0 : (this.donor.presentBalance + this.donor.lineOfCredit)}`);

			this.setFormDefaultRules();
			this.form.$('isRecurring').observe(({ field }) => {
				this.onRecurringChange(field.value);
			});
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
			this.form.$('endDate').observe(({ field }) => {
				this.onChangeEndDate(field.value);
			});
			this.form.$('numberOfPayments').observe(({ field }) => {
				this.onChangeNumberOfPayments(field.value);
			});
			this.form.$('noEndDate').observe(({ field }) => {
				this.onChangeNoEndDate(field.value);
			});
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
			this.form.$('charityContactEmail').observe(({ field }) => {
				this.form.$('charityContactNumber').setRequired(isNullOrWhiteSpacesOrUndefinedOrEmpty(field.value));
			});
			this.form.$('charityContactNumber').observe(({ field }) => {
				this.form.$('charityContactEmail').setRequired(isNullOrWhiteSpacesOrUndefinedOrEmpty(field.value));
			});

			if (this.grantRequestId) {
				const data = await this.grantStore.getGrantRequest(this.grantRequestId, {
					embed: 'charity,charity.charityAddresses',
				});
				this.form.$('charityId').set(data.charityId);
				this.setCharity(data.charity);
				this.form.$('amount').set(data.amount);
			}
		}
	}

	@action.bound
	onChangeEndDate(value) {
		if (value) {
			this.form.$('numberOfPayments').setDisabled(true);
			this.form.$('noEndDate').setDisabled(true);
		} else {
			this.form.$('numberOfPayments').setDisabled(false);
			this.form.$('noEndDate').setDisabled(false);
		}
	}

	@action.bound
	onChangeNumberOfPayments(value) {
		if (value) {
			this.form.$('endDate').setDisabled(true);
			this.form.$('noEndDate').setDisabled(true);
		} else {
			this.form.$('endDate').setDisabled(false);
			this.form.$('noEndDate').setDisabled(false);
		}
	}

	@action.bound
	onChangeNoEndDate(value) {
		if (value) {
			this.form.$('numberOfPayments').setDisabled(true);
			this.form.$('endDate').setDisabled(true);
		} else {
			this.form.$('numberOfPayments').setDisabled(false);
			this.form.$('endDate').setDisabled(false);
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
	onRecurringChange(value) {
		this.form.$('startFutureDate').setDisabled(value);
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
	getNumberOfReocurrency(startDate, endDate, scheduledTypeId) {
		let number = 0;
		if (scheduledTypeId === this.weeklyGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(7, 'days')
					.toDate();
				number = number + 1;
			}
		} else if (scheduledTypeId === this.twiceAMonthGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(14, 'days')
					.toDate();
				number = number + 1;
			}
		} else if (scheduledTypeId === this.monthlyGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(1, 'months')
					.toDate();
				number = number + 1;
			}
		} else if (scheduledTypeId === this.quarterlyGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(3, 'months')
					.toDate();
				number = number + 1;
			}
		} else if (scheduledTypeId === this.annualGrantId) {
			while (startDate < endDate) {
				startDate = moment(startDate)
					.add(1, 'years')
					.toDate();
				number = number + 1;
			}
		}
		return number;
	}

	@action.bound
	async onCharityChange(value) {
		let data = [];
		if (value) {
			const params = {
				donorId: this.donorId,
				embed: ['donationStatus'],
				fields: ['id', 'amount', 'dateCreated'],
				charityId: this.form.$('charityId').value,
			};
			data = await this.grantStore.findGrant(params);
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
		this.donor = await this.grantStore.getDonorInformation(this.donorId);
	}

	@action.bound
	async onCharitySelected(charity) {
		this.setCharity(charity);
		this.advancedSearchModal.close();
	}

	setCharity(charity) {
		this.charityDropdownStore.setValue({
			id: charity.id,
			name: charityFormatter.format(charity, { value: 'charity-name-display' }),
			item: charity,
		});
		this.form.$('charityId').set(charity.id);
		const address = charity.charityAddresses.find(c => c.isPrimary);
		this.setAddress(address);
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
		this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
		this.grantScheduleTypes = await this.rootStore.application.lookup.grantScheduleTypeStore.find();
		this.grantAcknowledgmentTypes = await this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
		this.grantPurposeTypes = await this.rootStore.application.lookup.grantPurposeTypeStore.find();

		this.grantPurposeTypeDropdownStore.setItems(
			this.grantPurposeTypes.filter(c => {
				return ['where-deemed-most-needed', 'general-fund', 'in-honor-of', 'solicited-by', 'other'].includes(c.abrv);
			})
		);
		const defaultPurposeTypeId = this.grantPurposeTypes.find(c => c.abrv === 'where-deemed-most-needed').id;
		this.grantPurposeTypeDropdownStore.setValue(defaultPurposeTypeId);
		this.form.$('grantPurposeTypeId').set(defaultPurposeTypeId);
		this.setSimilarGrantTable(defaultPurposeTypeId);

		this.grantAcknowledgmentTypeDropdownStore.setItems(this.grantAcknowledgmentTypes);
		const defaultGrantAcknowledgmentTypeId = this.grantAcknowledgmentTypes.find(
			c => c.abrv === 'name-fund-name-and-address'
		).id;
		this.grantAcknowledgmentTypeDropdownStore.setValue(defaultGrantAcknowledgmentTypeId);
		this.form.$('grantAcknowledgmentTypeId').set(defaultGrantAcknowledgmentTypeId);
		this.setGrantAcknowledgmentName(defaultGrantAcknowledgmentTypeId);
	}

	createGrantScheduleTypeDropdownStore() {
		this.grantScheduleTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				const data = await this.rootStore.application.lookup.grantScheduleTypeStore.find();
				return data.filter(c => c.abrv != 'one-time');
			},
		});
	}

	createGrantPurposeTypeDropdownStore() {
		this.grantPurposeTypeDropdownStore = new BaasicDropdownStore();
	}

	createGrantAcknowledgmentTypeDropdownStore() {
		this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore();
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
					const data = await this.grantStore.searchCharity({
						pageNumber: 1,
						pageSize: 10,
						search: searchQuery,
						sort: 'name|asc',
						embed: ['charityAddresses'],
						fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable'],
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

	@computed get oneTimeGrantId() {
		return this.grantScheduleTypes ? this.grantScheduleTypes.find(item => item.abrv === 'one-time').id : null;
	}

	@computed get weeklyGrantId() {
		return this.grantScheduleTypes ? this.grantScheduleTypes.find(item => item.abrv === 'weekly').id : null;
	}

	@computed get twiceAMonthGrantId() {
		return this.grantScheduleTypes ? this.grantScheduleTypes.find(item => item.abrv === 'twice-a-month').id : null;
	}

	@computed get monthlyGrantId() {
		return this.grantScheduleTypes ? this.grantScheduleTypes.find(item => item.abrv === 'monthly').id : null;
	}

	@computed get quarterlyGrantId() {
		return this.grantScheduleTypes ? this.grantScheduleTypes.find(item => item.abrv === 'quarterly').id : null;
	}

	@computed get annualGrantId() {
		return this.grantScheduleTypes ? this.grantScheduleTypes.find(item => item.abrv === 'annual').id : null;
	}
}

export default GrantCreateViewStore;
