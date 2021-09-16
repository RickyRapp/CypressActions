import { BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { BankAccountEditForm } from 'application/donor/donor/forms';
import { action } from 'mobx';
import { applicationContext, isSome } from 'core/utils';

@applicationContext
class DonorBankAccountEditViewStore extends BaseEditViewStore {
	constructor(rootStore, props) {
		super(rootStore, {
			name: 'bank-account',
			id: props.editId,
			actions: {
				get: async () => {
					const data = await rootStore.application.donor.donorStore.getBankAccount(props.editId, {
						embed: 'accountHolder',
					});
					return {
						name: data.name,
						accountNumber: data.accountNumber,
						routingNumber: data.routingNumber,
						description: data.description,
						coreMediaVaultEntryId: data.coreMediaVaultEntryId,
						isThirdPartyAccount: data.isThirdPartyAccount,
						accountHolderName: data.accountHolder && data.accountHolder.name,
						addressLine1: data.accountHolder && data.accountHolder.addressLine1,
						addressLine2: data.accountHolder && data.accountHolder.addressLine2,
						city: data.accountHolder && data.accountHolder.city,
						state: data.accountHolder && data.accountHolder.state,
						zipCode: data.accountHolder && data.accountHolder.zipCode,
						email: data.accountHolder && data.accountHolder.email,
						number: data.accountHolder && data.accountHolder.number,
					};
				},
				update: async resource => {
					if (!resource.isThirdPartyAccount) {
						resource.accountHolderName = this.donor.donorName;
						resource.addressLine1 = this.primaryAddress.addressLine1;
						resource.addressLine2 = this.primaryAddress.addressLine2;
						resource.city = this.primaryAddress.city;
						resource.state = this.primaryAddress.state;
						resource.zipCode = this.primaryAddress.zipCode;
						resource.email = this.primaryEmailAddress.email;
						resource.number = this.primaryPhoneNumber.number;
					}

					await rootStore.application.donor.donorStore.updateBankAccount(resource);
					if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
						await rootStore.application.donor.donorStore.uploadDonorBankAccount(
							this.imageUploadStore.files[0],
							this.donorId,
							resource.id
						);
					}
					rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
				},
				create: async resource => {
					if (!resource.isThirdPartyAccount) {
						resource.accountHolderName = this.donor.donorName;
						resource.addressLine1 = this.primaryAddress.addressLine1;
						resource.addressLine2 = this.primaryAddress.addressLine2;
						resource.city = this.primaryAddress.city;
						resource.state = this.primaryAddress.state;
						resource.zipCode = this.primaryAddress.zipCode;
						resource.email = this.primaryEmailAddress.email;
						resource.number = this.primaryPhoneNumber.number;
					}

					const data = await rootStore.application.donor.donorStore.createBankAccount({
						donorId: this.donorId,
						...resource,
					});
					if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
						await rootStore.application.donor.donorStore.uploadDonorBankAccount(
							this.imageUploadStore.files[0],
							this.donorId,
							data.response
						);
					}
					rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
				},
			},
			FormClass: BankAccountEditForm,
			onAfterAction: () => {
				if (props.onEditCompleted) {
					props.onEditCompleted();
				}
				if (props.modalParams && props.modalParams.data && props.modalParams.data.onAfterAction) {
					props.modalParams.data.onAfterAction();
				}
			},
		});

		this.donorId = rootStore.userStore.applicationUser.id;
		this.createImageUploadStore();
		this.onCancelEditClick = props.onCancelEditClick;
	}

	@action.bound
	async onInit({ initialLoad }) {
		if (!initialLoad) {
			this.rootStore.routerStore.goBack();
		} else {
			await this.fetch([this.getDonorInfo()]);

			if (this.isEdit) {
				if (this.form.$('coreMediaVaultEntryId').value) {
					this.imageUploadStore.setInitialItems(this.form.$('coreMediaVaultEntryId').value);
					this.form.$('coreMediaVaultEntryId').setDisabled(true);
				}
			}
		}
	}

	@action.bound
	async onBlurRoutingNumber(value) {
		if (value && value.replace(/-/g, '').length === 9) {
			const data = await this.rootStore.application.donor.bankStore.findRoutingNumber({
				pageNumber: 1,
				pageSize: 10,
				embed: ['bank'],
				number: value,
			});

			if (data && data.item.length > 0) {
				this.form.$('name').set(data.item[0].bank.name);
			}
		}
	}

	async getDonorInfo() {
		if (!this.donor) {
			this.donor = await this.rootStore.application.donor.donorStore.getDonor(this.donorId, {
				embed: 'donorAddresses,donorEmailAddresses,donorPhoneNumbers',
				fields: 'donorName,donorAddresses,donorEmailAddresses,donorPhoneNumbers',
			});
			this.primaryAddress = this.donor.donorAddresses.find(c => c.isPrimary);
			this.primaryEmailAddress = this.donor.donorEmailAddresses.find(c => c.isPrimary);
			this.primaryPhoneNumber = this.donor.donorPhoneNumbers.find(c => c.isPrimary);
		}
	}

	@action.bound
	async useDonorContactInformations(type) {
		if (type === 'address') {
			this.form.$('addressLine1').set(this.primaryAddress.addressLine1);
			this.form.$('addressLine2').set(this.primaryAddress.addressLine2);
			this.form.$('city').set(this.primaryAddress.city);
			this.form.$('state').set(this.primaryAddress.state);
			this.form.$('zipCode').set(this.primaryAddress.zipCode);
		} else if (type === 'emailAddress') {
			this.form.$('email').set(this.primaryEmailAddress.email);
		} else if (type === 'phoneNumber') {
			this.form.$('number').set(this.primaryPhoneNumber.number);
		}
	}

	createImageUploadStore() {
		this.imageUploadStore = new BaasicUploadStore(null, {
			onChange: value => {
				this.form.$('coreMediaVaultEntryId').setDisabled(isSome(value));
			},
			onDelete: () => {
				this.form.$('coreMediaVaultEntryId').setDisabled(false);
			},
			onRemoveFromBuffer: () => {
				this.form.$('coreMediaVaultEntryId').setDisabled(false);
			},
		});
	}
}

export default DonorBankAccountEditViewStore;
