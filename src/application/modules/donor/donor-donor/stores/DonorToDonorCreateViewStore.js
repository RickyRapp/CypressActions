import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore, TableViewStore } from 'core/stores';
import { applicationContext, donorFormatter } from 'core/utils';
import { DonorToDonorCreateForm } from 'application/donor/donor-donor/forms';
import { ModalParams } from 'core/models';

@applicationContext
class DonorToDonorCreateViewStore extends BaseEditViewStore {
	@observable grantAcknowledgmentName = null;
	@observable addAnotherRecipientForm = null;
	@observable summaryInfo = false;
	@observable errorMessage = null;
	@observable additionalErrorMessage = null;
	donor = null;
	donorBalance = null;
	applicationDefaultSetting = {};
	grantAcknowledgmentTypes = [];
	grantRequestId = null;
	currentlyExpanded = 'whatIsGift';

	constructor(rootStore, { donorId, donorToDonorStore }) {
		super(rootStore, {
			name: 'donor-to-donor-create',
			id: undefined,
			autoInit: false,
			actions: () => {
				return {
					create: async (resource) => {
						resource.donorSenderId = this.donorId;
						resource.createdBy = this.donorId;
						resource.fullName = resource.contactInformationName;
						if (this.donorRecipientId)
							resource.donorRecipientId = this.donorRecipientId;
						if (this.donorRecipientId2)
							resource.donorRecipientId2 = this.donorRecipientId2;

						await rootStore.application.donor.donorToDonorStore.createTransaction(resource);
					},
				};
			},
			FormClass: DonorToDonorCreateForm,
			onAfterAction: () => {
				this.confirmModal.close();
				this.summaryInfo = true;
			},
		});

		this.donorId = donorId;
		this.donorToDonorStore = donorToDonorStore;

		if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.grantRequestId) {
			this.grantRequestId = rootStore.routerStore.routerState.queryParams.grantRequestId;
		}

		this.createGrantAcknowledgmentTypeDropdownStore();
		this.createRecentTransfersTableStore();
		this.createConfirmModalParams();

		this.advancedSearchModal = new ModalParams({});
	}

	@action.bound
	async onInit({ initialLoad }) {
		if (!initialLoad) {
			this.rootStore.routerStore.goBack();
		} else {
			await this.fetch([this.setDonor()]);
			await this.fetch([this.loadLookups()]);
		}
	}

	@action.bound
	openFAQ(faq) {
		let elements = document.getElementsByClassName(faq);
		if (this.currentlyExpanded === faq) {
			for (let i = 0; i < elements.length; i++)
				elements[i].classList.remove('is-expanded')
			this.currentlyExpanded = '';
		} else {
			for (let i = 0; i < elements.length; i++)
				elements[i].classList.add('is-expanded')
			elements = document.getElementsByClassName(this.currentlyExpanded);
			for (let i = 0; i < elements.length; i++)
				elements[i].classList.remove('is-expanded')
			this.currentlyExpanded = faq;
		}
	}

	@action.bound
	async onSubmitClick() {
		this.errorMessage = null;
		this.additionalErrorMessage = null;
		const { isValid } = await this.form.validate({ showErrors: true });
		if (isValid) {
			let searchCriteria = this.form.$('emailOrAccountNumber').value;
			this.email = searchCriteria;
			this.accNumber = null; this.item2 = null;
			if (!isNaN(searchCriteria)) {
				this.accNumber = searchCriteria;
				this.email = null;
			}

			const data = await this.rootStore.application.administration.donorStore.findDonorByUsernameOrAccNumber(
				{
					emails: this.email,
					accountNumber: this.accNumber,
					fields: [
						'id',
						'donorName',
						'firstName',
						'lastName',
						'accountNumber',
						'accountType',
						'accountType.name',
						'presentBalance',
					]
				});
				
			if (data.length > 0) {
				this.donorRecipientId = data[0].id;
				let splitedNames = data[0].donorName.split(' ');
				this.item = splitedNames.slice(0, 1).join(' ') + ' ' + splitedNames.slice(-1).join(' ').charAt(0) + '.';
			}else{
				this.errorMessage = "Donor could not be found";
				return false;
			}

			if (this.addAnotherRecipientForm) {
				let searchCriteria2 = this.form.$('emailOrAccountNumberAnother').value;
				this.email2 = searchCriteria2;
				this.accNumber = null;

				if (!isNaN(searchCriteria2)) {
					this.accNumber2 = searchCriteria2;
					this.email2 = null;
				}

				const data2 = await this.rootStore.application.administration.donorStore.findDonorByUsernameOrAccNumber(
					{
						emails: this.email2,
						accountNumber: this.accNumber2,
						fields: [
							'id',
							'donorName',
							'firstName',
							'lastName',
							'accountNumber',
							'accountType',
							'accountType.name',
							'presentBalance',
						]
					});

				if (data2.length > 0) {
					this.donorRecipientId2 = data2[0].id;
					let splitedNames2 = data2[0].donorName.split(' ');
					this.item2 = splitedNames2.slice(0, 1).join(' ') + ' ' + splitedNames2.slice(-1).join(' ').charAt(0) + '.';
				} else {
					this.additionalErrorMessage = "Donor could not be found";
					this.item2 = null;
					return false;
				}
			}

			this.confirmModal.open({
				onCancel: () => {
					this.confirmModal.close();
				},
				form: this.form,
				item: this.item,
				accNumber: this.accNumber,
				item2: this.item2,
				recipient2: this.addAnotherRecipientForm
			});
		}
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

				this.grantPurposeTypeDropdownStore.setValue(
					this.grantPurposeTypes.find(item => item.id === this.applicationDefaultSetting.grantPurposeTypeId)
				);

				this.form.$('grantAcknowledgmentTypeId').validate({ showErrors: true });
			} else {
				//regular
				this.form.$('grantAcknowledgmentTypeId').setDisabled(false);
			}
		} else {
			this.amountWithFee = null;
			this.form.$('grantAcknowledgmentTypeId').setDisabled(false);
		}
	}

	createConfirmModalParams() {
		this.confirmModal = new ModalParams({});
	}

	@action.bound
	addAnotherRecipient() {
		this.addAnotherRecipientForm = !this.addAnotherRecipientForm;
		this.form.$('anotherRecipientForm').set(this.addAnotherRecipientForm);
	}

	@action.bound
	setFormDefaultRules() {
		if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
			this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
		}
	}

	@action.bound
	async setDonor() {
		this.donor = await this.donorToDonorStore.getDonorInformation(this.donorId);
		const params = {
			donorId: this.donorId
		}
		params.embed = ['paymentTransaction'];
		this.donorToDonorRecentTransfers = await this.donorToDonorStore.findDonorToDonorAsync(params);
		this.donorBalance = await this.rootStore.application.donor.transactionStore.loadDonorData(this.donorId);
	}

	@action.bound
	setRecentTransfersTable() {
		this.recentTransfersTableStore.setData(this.donorToDonorRecentTransfers.item);
		if (!this.recentTransfersTableStore.dataInitialized) {
			this.recentTransfersTableStore.dataInitialized = true;
		}
	}

	@action.bound
	setGrantAcknowledgmentName(value) {
		if (value) {
			this.grantAcknowledgmentName = donorFormatter.format(this.donor, {
				type: 'grant-acknowledgment-type',
				value: this.grantAcknowledgmentTypes.find(c => c.id === value).abrv,
			});
		}
		else this.grantAcknowledgmentName = null;
	}

	@action.bound
	onGrantAcknowledgmentTypeChange(value) {
		this.setGrantAcknowledgmentName(value);
	}

	async loadLookups() {
		this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
		this.grantAcknowledgmentTypes = await this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();

		this.setRecentTransfersTable();

		this.grantAcknowledgmentTypeDropdownStore.setItems(this.grantAcknowledgmentTypes);
		const defaultGrantAcknowledgmentTypeId = this.grantAcknowledgmentTypes.find(
			c => c.abrv === 'name-and-address'
		).id;
		this.grantAcknowledgmentTypeDropdownStore.setValue(defaultGrantAcknowledgmentTypeId);
		this.form.$('grantAcknowledgmentTypeId').set(defaultGrantAcknowledgmentTypeId);
		this.setGrantAcknowledgmentName(defaultGrantAcknowledgmentTypeId);
	}

	createGrantAcknowledgmentTypeDropdownStore() {
		this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore();
	}

	createRecentTransfersTableStore() {
		this.recentTransfersTableStore = new TableViewStore(null, {
			columns: [
				{
					key: 'dateCreated',
					title: 'DONOR-DONOR.LIST.COLUMNS.DATE_CREATED_LABEL',
					format: {
						type: 'date',
						value: 'short',
					},
				},
				{
					key: 'fullName',
					title: 'DONOR-DONOR.LIST.COLUMNS.NAME_LABEL',
				},
				{
					key: 'amount',
					title: 'DONOR-DONOR.LIST.COLUMNS.AMOUNT_LABEL',
					format: {
						type: 'currency',
						value: '$',
					},
				},
			],
		});
	}
}

export default DonorToDonorCreateViewStore;
