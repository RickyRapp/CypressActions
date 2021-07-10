import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore, TableViewStore } from 'core/stores';
import { applicationContext, donorFormatter } from 'core/utils';
import { DonorToDonorCreateForm } from 'application/donor/donor-donor/forms';
import { ModalParams } from 'core/models';

@applicationContext
class DonorToDonorCreateViewStore extends BaseEditViewStore {
	@observable grantAcknowledgmentName = null;
	donor = null;
	donorBalance = null;
	applicationDefaultSetting = {};
	grantAcknowledgmentTypes = [];
	grantRequestId = null;
	addAnotherRecipientForm = null;

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
							resource.donorRecipientId = this.donorRecipientId
						
						 await rootStore.application.donor.donorToDonorStore.createTransaction(resource);
					},
				};
			},
			FormClass: DonorToDonorCreateForm,
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
	async onSubmitClick() {
		const { isValid } = await this.form.validate({ showErrors: true });
		if (isValid) {
			let searchCriteria = this.form.$('emailOrAccountNumber').value;
			this.email = searchCriteria;
			this.accNumber = null;
			if (!isNaN(searchCriteria)) {
				this.accNumber = searchCriteria;
				this.email = null;
			}

			const data = await this.rootStore.application.administration.donorStore.findDonors(
				{
					emails: this.email,
					accountNumber: this.accNumber,
					embed: ['accountType'],
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
			if (data.item.length > 0) {
				this.donorRecipientId = data.item[0].id;
				let splitedNames = data.item[0].donorName.split(' ');
				this.item = splitedNames.slice(0, 1).join(' ') + ' ' + splitedNames.slice(-1).join(' ').charAt(0) + '.';
			}

			this.confirmModal.open({
				onCancel: () => {
					this.confirmModal.close();
				},
				form: this.form,
				item: this.item,
				accNumber: this.accNumber
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
	addAnotherRecipient(data) {
		this.addAnotherRecipientForm = data;
		return;
	}

	@action.bound
	setFormDefaultRules() {
		if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
			this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
		}
	}

	@action.bound
	async setDonor() {
		//this.donor = await this.donorToDonorStore.getDonorInformation(this.donorId);
		const params = {
			donorId: this.donorId,
		}
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
		if (value)
			this.grantAcknowledgmentName = donorFormatter.format(this.donor, {
				type: 'grant-acknowledgment-type',
				value: this.grantAcknowledgmentTypes.find(c => c.id === value).abrv,
			});
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
