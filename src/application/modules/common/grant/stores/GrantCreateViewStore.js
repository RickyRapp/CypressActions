import { action, computed, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore, TableViewStore } from 'core/stores';
import { applicationContext, donorFormatter, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { GrantCreateForm } from 'application/common/grant/forms';
import moment from 'moment';
import _ from 'lodash';
import { charityFormatter, addressFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { localStorageProvider } from 'core/providers';
@applicationContext
class GrantCreateViewStore extends BaseEditViewStore {
	@observable isNoteToAdministratorIncluded = false;
	@observable grantAcknowledgmentName = null;
	@observable isChangedDefaultAddress = null;
	@observable charityInputValue = null;
	@observable filteredCharities = [];
	donor = null;
	applicationDefaultSetting = {};
	grantScheduleTypes = [];
	grantAcknowledgmentTypes = [];
	grantPurposeTypes = [];
	grantRequestId = null;
	charities = [];
	isFuture = false;
	isGrantAgain = false;
	@observable defaultValue = '';
	@observable charity = null;
	@observable inputCharity = '';
 	@observable asyncPlaceholder = '';
	@observable moreSettings = false;
	@observable isAdvancedInput = false;
	debouncedSearchCharities =  _.debounce(this.filterCharities, 500);

	constructor(rootStore, { donorId, grantStore }) {
		super(rootStore, {
			name: 'grant-create',
			id: undefined,
			autoInit: false,
			actions: () => {
				return {
					create: async resource => {
						resource.donorId = this.donorId;
						if (!isNullOrWhiteSpacesOrUndefinedOrEmpty(this.grantRequestId) && !resource.isRecurring) {
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
							if (moment(resource.startFutureDate) > moment()) {
								if (resource.isRecurring == false) {
									const data = await this.rootStore.application.lookup.grantScheduleTypeStore.find();
									resource.grantScheduleTypeId = data.filter(c => c.abrv == 'one-time')[0].id;
									resource.numberOfPayments = 1;
									const resultRec = await this.grantStore.createScheduledGrant(resource);
									this.grantId = resultRec;
									this.isFuture = true;
								}
							} else if(resource.isRecurring) {
								// eslint-disable-next-line
								const resultRec = await this.grantStore.createScheduledGrant(resource);
								this.grantId = resultRec;
								
							} else {
								var result = await this.grantStore.createGrant(resource);
								this.grantId = result.response;
							}
						}
					},
				};
			},
			onAfterAction: () => {
				if(this.rootStore.userStore.applicationUser.roles[0] === 'Administrators') {
					if(!this.isFuture && !this.form.$('isRecurring').value)
						this.rootStore.routerStore.goTo('master.app.main.administration.grant.preview', { id: this.grantId });
					else
						this.rootStore.routerStore.goTo('master.app.main.administration.grant.scheduled-preview', { id: this.grantId });
				} else {
					if(!this.isFuture && !this.form.$('isRecurring').value)
						this.rootStore.routerStore.goTo('master.app.main.donor.grant.preview', { id: this.grantId });
					else
						this.rootStore.routerStore.goTo('master.app.main.donor.grant.scheduled-preview', {id: this.grantId} )
					// else if(!this.isFuture && this.form.$('isRecurring').value)
					// 	this.rootStore.routerStore.goBack();
					// else
					// 	this.rootStore.routerStore.goBack();
				}
				this.rootStore.notificationStore.success('Successfully created a grant');
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
		this.createConfirmModalParams();
		this.advancedSearchModal = new ModalParams({});
	}

	@action.bound
	async onInit({ initialLoad }) {
		
		if (!initialLoad) {
			
			this.rootStore.routerStore.goBack();
		} else {
			
			await this.setDonor();
			await this.fetch([this.loadLookups()]);
			const isExistingGrant = localStorageProvider.get('ExistingGrant');
			
			if(isExistingGrant) {
				this.isGrantAgain = true;
				this.rootStore.notificationStore.warning('Please wait... Charity info is loading')
				const grant = (localStorageProvider.get('ExistingGrantObject'));
				localStorageProvider.remove('ExistingGrantObject');
				localStorageProvider.remove('ExistingGrant');
				this.charityDropdownStore.setValue({
					id: grant.charityId,
					name: charityFormatter.format(grant.charity, { value: 'charity-name-display' }),
					item: grant.charity,
				});
				this.inputCharity = this.charityDropdownStore.value.name;
				this.form.$('grantPurposeTypeId').value = grant.grantPurposeTypeId;
				if(grant.grantPurposeType.abrv == 'in-honor-of' || grant.grantPurposeType.abrv == 'in-memory-of' || grant.grantPurposeType.abrv == 'other')
					this.form.$('purposeNote').value = grant.purposeNote;
				
				this.setGrantAcknowledgmentName(this.form.$('grantAcknowledgmentTypeId').value);
				this.onCharityChange(grant.charityId);
				this.setSimilarGrantTable(grant.grantPurposeTypeId);
				this.setAmount(grant.amount);
				this.form.$('amount').value = grant.amount;
				this.form.$('charityId').value = grant.charityId;
				this.setAddress(grant.charity.charityAddresses.find(c => {
					return c.isPrimary === true;
				}));
				await this.filterCharities(grant.charity.name);
				this.setCharityId(grant.charityId);
				const formattedCharityAddress = addressFormatter.format(
					grant.charity.charityAddresses.find(c => {
						return c.isPrimary === true;
					}),
					'full'
				);
				const formattedGrantAddress = addressFormatter.format(grant, 'full');
				this.isChangedDefaultAddress = formattedCharityAddress === formattedGrantAddress;
			}
			this.amountRules();
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
			this.form.$('startFutureDate').observe(() => {
				this.amountRules();
			})
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
				this.form.$('charityContactEmail').set(field.value);
			});
			this.form.$('charityContactNumber').observe(({ field }) => {
				this.form.$('charityContactNumber').set(field.value);
			});
			// this.form.$('charityContactEmail').observe(({ field }) => {
			// 	this.form.$('charityContactEmail').setRequired(isNullOrWhiteSpacesOrUndefinedOrEmpty(field.value));
			// });
			// this.form.$('charityContactNumber').observe(({ field }) => {
			// 	this.form.$('charityContactNumber').setRequired(isNullOrWhiteSpacesOrUndefinedOrEmpty(field.value));
			// });

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
	toggleSettings() {
		this.moreSettings = !this.moreSettings;
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

	//#region MODAL
	@action.bound
	async onSubmitClick() {
		if(this.form.$('amount').value > this.donor.availableBalance + this.donor.lineOfCredit && moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD')) {
			const { modalStore } = this.rootStore;
			modalStore.showConfirm((`Insufficient funds! Deposit new funds?`), async () => {
				if(this.rootStore.userStore.user.roles.includes('Users'))
					this.rootStore.routerStore.goTo("master.app.main.donor.contribution.create");
				else
					this.rootStore.routerStore.goTo("master.app.main.administration.contribution.create", {id: this.donorId});
			})
			return;
		}
		const { isValid } = await this.form.validate({ showErrors: true });
		if (isValid) {
			this.confirmModal.open({
				onCancel: () => {
					this.confirmModal.close();
				},
				form: this.form,
				grantAcknowledgmentName: this.grantAcknowledgmentName,
				charity: this.charity,
				amount: this.form.$('amount').value,
				date: moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD'),
				recurring: this.form.$('isRecurring').$value ? "Yes" : "No",
				purpose: this.grantPurposeTypeDropdownStore.items.find(c => c.id === this.form.$('grantPurposeTypeId').value)
			});
		}
	}
	//#endregion

	@action.bound
	onGrantPurposeTypeChange(value) {
		this.setFieldRules(value);
		this.setSimilarGrantTable(value);
	}

	@action.bound
	setFieldRules(selectedOption) {
		this.resetFieldRules();
		if (selectedOption !== this.grantPurposeTypes.find(c => c.abrv === 'where-deemed-most-needed').id && selectedOption !== this.grantPurposeTypes.find(c => c.abrv === 'general-fund').id) {
			this.form.$('purposeNote').set('rules', 'required');
		}
	}

	@action.bound
	resetFieldRules() {
		this.form.$('purposeNote').set('rules', '');
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
		this.amountRules();
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
		if(value) {
			this.form.$('startFutureDate').value = null;
		}
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
		if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create') && (moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD'))) {
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
			const donationTypes = await this.rootStore.application.lookup.donationTypeStore.find();
			const visibleDonations = ['online', 'grant-request', 'giving-card', 'charity-website']
			const params = {
				donorId: this.donorId,
				embed: ['donationStatus'],
				fields: ['id', 'amount', 'dateCreated'],
				charityId: this.form.$('charityId').value,
				donationTypeIds: donationTypes.filter(c => visibleDonations.includes(c.abrv)).map(c => c.id).join(',')
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
        //const dataDonor = await this.rootStore.application.donor.dashboardStore.loadDashboardData(this.rootStore.userStore.applicationUser.id);
        const dataDonor = await this.rootStore.application.donor.dashboardStore.loadDashboardData(this.donorId);
		this.donor.availableBalance = dataDonor.presentBalance;
	}

	@action.bound
	async onCharitySelected(charity) {
		this.isAdvancedInput = true;
		this.form.$('charityId').set(charity.id);
		this.asyncPlaceholder = charityFormatter.format(charity, {value: 'charity-name-display'});
		this.charity = charity;
		this.setAddress(charity.charityAddresses.find(c => c.isPrimary));
		this.setSimilarGrantTable(charity.charityTypeId);
		this.advancedSearchModal.close();
	}

	createConfirmModalParams() {
		this.confirmModal = new ModalParams({});
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
		this.similarGrantsTableStore.setData(this.donor.similarGrants.filter(c => c.charityTypeId === value).sort());
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

	@action.bound
	setCharityVal(val) {
		this.charityInputValue = val;
		this.debouncedSearchCharities(val);
	}

	async loadLookups() {
		this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
		this.grantScheduleTypes = await this.rootStore.application.lookup.grantScheduleTypeStore.find();
		this.grantAcknowledgmentTypes = await this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
		this.grantPurposeTypes = await this.rootStore.application.lookup.grantPurposeTypeStore.find();
		this.charityTypes = await this.rootStore.application.lookup.charityTypeStore.find();
		this.grantPurposeTypeDropdownStore.setItems(
			this.grantPurposeTypes.filter(c => {
				return ['where-deemed-most-needed', 'general-fund', 'in-honor-of', 'solicited-by', 'other', 'in-memory-of'].includes(c.abrv);
			})
		);
		const defaultPurposeTypeId = this.grantPurposeTypes.find(c => c.abrv === 'where-deemed-most-needed').id;
		this.grantPurposeTypeDropdownStore.setValue(defaultPurposeTypeId);

		//const defaultCharityTypeId = this.charityTypes.find(c => c.abrv === 'human-services').id;

		this.form.$('grantPurposeTypeId').set(defaultPurposeTypeId);
		//this.setSimilarGrantTable(defaultCharityTypeId);

		this.grantAcknowledgmentTypeDropdownStore.setItems(this.grantAcknowledgmentTypes);
		// localStorage.clear(); - may be needed, because previouse abrv was cached
		const defaultGrantAcknowledgmentTypeId = this.grantAcknowledgmentTypes.find(
			c => c.abrv === 'name-and-address'
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
	@action.bound 
	amountRules() {
		if(moment(this.form.$('startFutureDate').$value).format('YYYY-MM-DD') == moment().format('YYYY-MM-DD'))
			this.form.$('amount').set('rules', `${this.form.$('amount').rules}|max:${(this.donor.presentBalance + this.donor.lineOfCredit) < 0 ? 0 : (this.donor.presentBalance + this.donor.lineOfCredit)}`);
		else
			this.form.$('amount').set('rules', 'required|numeric|min:100');
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
						fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary'],
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
					this.setSimilarGrantTable(this.charityDropdownStore.value.item.charityTypeId);
					if (value) {
						const address = this.charityDropdownStore.value.item.charityAddresses.find(c => c.isPrimary);
						this.setAddress(address);
					}
				},
			}
		);
	}
	@action.bound
	setCharityId(id) {
		this.isAdvancedInput = false;
		this.form.$('charityId').set(id);
		const charity = this.filteredCharities.find(x => x.value === id);
		this.charity = charity;
		this.asyncPlaceholder = charityFormatter.format(charity, { value: 'charity-name-display' });
		if(charity && charity.item && charity.item.charityAddresses) {
			this.setAddress(charity && charity.item && charity.item.charityAddresses.find(c => c.isPrimary));
		} else {
			this.setAddress(charity && charity.item);
		}
		this.setSimilarGrantTable(this.charity.item.charityTypeId);
	}
	@action.bound
	setInputValue(value) {
		this.charityInputValue = value;
	} 

	@action.bound
	async filterCharities(inputValue, resolve ) {
		const data = await this.grantStore.searchCharity({
			pageNumber: 1,
			pageSize: 10,
			search: inputValue,
			sort: 'name|asc',
			embed: ['charityAddresses', 'charityBankAccounts'],
			fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary'],
		});
		const mapped = data.item.map(x => {
			return {
				id: x.id,
				name: charityFormatter.format(x, { value: 'charity-name-display' }),
				item: x,
			};
		});
		let options = [];
		mapped.forEach(item => {
			options.push({value: item.id, label:item.name, item: item.item});
		});
		this.filteredCharities = options;
		return resolve(options);
	};
	
	@action.bound
	async charityLoadOptions(inputValue) {
		await this.filterCharities(inputValue);
	};

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
				{
					key: 'charity',
					title: 'GRANT.LIST.COLUMNS.CHARITY_LABEL'
				}
			],
		});
	}

	// @action.bound
	// async onSubmitClick(resource) {
	// 	const { isValid } = await this.form.validate({ showErrors: true });
	// 	if (isValid) {
	// 		this.confirmModal.open({
	// 			onCancel: () => {
	// 				this.confirmModal.close();
	// 			},
	// 			onSubmit: async () => {
	// 					this.form.setFieldsDisabled(true);
	// 					this.loaderStore.suspend();
	// 					try {
	// 						if (this.translationStore) {
	// 							this.translationStore.applyMetadata(resource);
	// 						}
	// 						await this.actions.create(resource);
							
	// 						if (this.onAfterAction) {
	// 							this.onAfterAction();
	// 						}
	// 						else {
	// 							await this.rootStore.routerStore.goBack();
	// 							await setTimeout(() => this.notifySuccessCreate(this.name), 10);
	// 						}
	// 					}
	// 					catch (err) {
	// 						return this.onCreateError(err);
	// 					} finally {
	// 						this.form.setFieldsDisabled(false);
	// 						this.loaderStore.resume();
	// 					}
	// 			},
	// 			form: this.form,
	// 			grantAcknowledgmentName: this.grantAcknowledgmentName,
	// 			charityName: this.charityDropdownStore.value.name
	// 		});
	// 	}
	// }

	// @action.bound
    // async createResource(resource) {
    //     if (!this.actions.create) return;
	// 	const { modalStore } = this.rootStore;
	// 	modalStore.showConfirm((`Grant acknowledgment name: ${this.grantAcknowledgmentName}
	// 	\n\r
	// 	Recepient charity: ${this.charity.label}
	// 	\n\r
	// 	Given amount: $${this.form.$('amount').$value}`), async () => {
	// 		this.form.setFieldsDisabled(true);
	// 		this.loaderStore.suspend();
	// 		try {
	// 			if (this.translationStore) {
	// 				this.translationStore.applyMetadata(resource);
	// 			}

	// 			await this.actions.create(resource);

	// 			if (this.onAfterAction) {
	// 				this.onAfterAction();
	// 			}
	// 			else {
	// 				await this.rootStore.routerStore.goBack();
	// 				await setTimeout(() => this.notifySuccessCreate(this.name), 10);
	// 			}
	// 		}
	// 		catch (err) {
	// 			return this.onCreateError(err);
	// 		} finally {
	// 			this.form.setFieldsDisabled(false);
	// 			this.loaderStore.resume();
	// 		}
	// 	})
    // }

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
