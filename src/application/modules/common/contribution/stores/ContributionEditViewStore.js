import { BaseEditViewStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { ContributionCreateForm } from 'application/common/contribution/forms';
import { action, observable } from 'mobx';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import _ from 'lodash';

@applicationContext
class ContributionEditViewStore extends BaseEditViewStore {
	@observable paymentTypes = [];
	@observable step = 1;
	@observable isThirdPartyFundingAvailable = false;
	donor = null;

	constructor(rootStore, { contributionStore, step }) {
		super(rootStore, {
			name: 'contribution-create',
			id: rootStore.routerStore.routerState.params.id,
			autoInit: false,
			actions: () => {
				return {
					update: async resource => {
						if (!resource.isThirdParty) {
							resource.name = this.donor.donorName;
							resource.addressLine1 = this.donor.donorAddress.addressLine1;
							resource.addressLine2 = this.donor.donorAddress.addressLine2;
							resource.city = this.donor.donorAddress.city;
							resource.state = this.donor.donorAddress.state;
							resource.zipCode = this.donor.donorAddress.zipCode;
							resource.email = this.donor.donorEmailAddress.email;
							resource.number = this.donor.donorPhoneNumber.number;
						}
						return this.contributionStore.updateContribution({ id: this.id, ...resource });
					},
					get: async id => {
						const data = await this.contributionStore.getContribution(id, {
							embed: 'payerInformation,donorBankAccount,contributionStatus',
						});
						return {
							...data,
							...data.payerInformation,
						};
					},
				};
			},
			FormClass: ContributionCreateForm,
			onAfterAction: () => {
				this.nextStep();
			},
		});

		this.contributionStore = contributionStore;
		if (step) {
			this.step = step;
		}

		this.routes = {
			allContributions: () => {
				this.rootStore.routerStore.goTo('master.app.main.donor.activity', {}, { headerTab: 1 });
			},
		};

		this.createBankAccountModalParams();
		this.createConfirmModalParams();
		this.createPaymentTypeDropdownStore();
		this.createBankAccountDropdownStore();
		this.createBrokerageInstitutionDropdownStore();
		this.createSecurityTypeDropdownStore();
		this.createBusinessTypeDropdownStore();
		this.createPropertyTypeDropdownStore();
		this.createCollectibleTypeDropdownStore();
		this.createPreviousContributionsTableStore();
		this.createThirdPartyDonorAdvisedFundDropdownStore();
	}

	@action.bound
	async onInit({ initialLoad }) {
		if (!initialLoad) {
			this.rootStore.routerStore.goBack();
		} else {
			await this.fetch([this.getResource(this.id)]);

			await this.fetch([await this.loadDonor(this.item.donorId), await this.bankAccountDropdownStore.filterAsync()]);
			this.previousContributionsTableStore.setData(this.donor.previousContributions);
			if (!this.previousContributionsTableStore.dataInitialized) {
				this.previousContributionsTableStore.dataInitialized = true;
			}

			if (this.item.donorBankAccount) {
				this.bankAccountDropdownStore.setValue(this.item.donorBankAccount);
			}
		}
	}

	@action.bound
	async onSubmitClick() {
		const { isValid } = await this.form.validate({ showErrors: true });
		if (isValid) {
			this.confirmModal.open({
				onCancel: () => {
					this.confirmModal.close();
				},
				form: this.form,
				paymentType: this.paymentTypes.find(c => c.id === this.form.$('paymentTypeId').value),
				bankAccount: this.bankAccountDropdownStore.items.find(c => c.id === this.form.$('bankAccountId').value),
			});
		}
	}

	async loadDonor(donorId) {
		this.donor = await this.contributionStore.getDonorInformation(donorId);
	}

	@action.bound
	onSelectPaymentType(id) {
		this.form.clear();
		this.bankAccountDropdownStore.setValue(null);
		this.brokerageInstitutionDropdownStore.setValue(null);
		this.securityTypeDropdownStore.setValue(null);
		this.businessTypeDropdownStore.setValue(null);
		this.propertyTypeDropdownStore.setValue(null);
		this.collectibleTypeDropdownStore.setValue(null);
		this.form.$('paymentTypeId').set(id);
		const paymentType = this.paymentTypes.find(c => c.id === id);
		if (paymentType) {
			this.form.$('bankAccountId').setRequired(false);
			this.form.$('checkNumber').setRequired(false);
			this.form.$('amount').set('rules', 'required|numeric|min:0');
			this.form.$('brokerageInstitutionId').setRequired(false);
			this.form.$('securityTypeId').setRequired(false);
			this.form.$('businessTypeId').setRequired(false);
			this.form.$('propertyTypeId').setRequired(false);
			this.form.$('collectibleTypeId').setRequired(false);
			this.isThirdPartyFundingAvailable = false;

			if (paymentType.abrv === 'ach') {
				this.form.$('bankAccountId').setRequired(true);
				this.isThirdPartyFundingAvailable = true;
			} else if (paymentType.abrv === 'wire-transfer') {
				this.isThirdPartyFundingAvailable = true;
			} else if (paymentType.abrv === 'stock-and-securities') {
				this.form.$('amount').set('rules', 'required|numeric|min:1000');
				this.form.$('brokerageInstitutionId').setRequired(true);
				this.form.$('securityTypeId').setRequired(true);
			} else if (paymentType.abrv === 'zelle') {
				this.isThirdPartyFundingAvailable = true;
			} else if (paymentType.abrv === 'check') {
				this.form.$('checkNumber').setRequired(true);
				this.isThirdPartyFundingAvailable = true;
			} else if (paymentType.abrv === 'business-and-private-interests') {
				this.form.$('businessTypeId').setRequired(true);
				this.form.$('amount').set('rules', 'required|numeric|min:50000');
			} else if (paymentType.abrv === 'real-estate') {
				this.form.$('propertyTypeId').setRequired(true);
				this.form.$('amount').set('rules', 'required|numeric|min:50000');
			} else if (paymentType.abrv === 'collectible-assets') {
				this.form.$('collectibleTypeId').setRequired(true);
				this.form.$('amount').set('rules', 'required|numeric|min:25000');
			}
		}
		this.form.$('checkNumber').setRequired(paymentType && paymentType.abrv === 'check');
		const json = JSON.parse(paymentType.json);
		this.form.$('amount').set('rules', `required|numeric|min:${json.minimumDeposit}`);
		this.nextStep(2);
	}

	@action.bound
	nextStep(step) {
		if (step) {
			this.step = step;
		} else {
			this.step = this.step + 1;
		}
	}

	@action.bound
	onAddBankAccountClick() {
		this.bankAccountModal.open({
			donorId: this.item.donorId,
			onAfterAction: async () => {
				await this.bankAccountDropdownStore.filterAsync(null);
				const sorted = _.orderBy(this.bankAccountDropdownStore.items, ['dateCreated'], ['desc']);
				this.form.$('bankAccountId').set(sorted[0].id);
				this.bankAccountModal.close();
			},
		});
	}

	createBankAccountModalParams() {
		this.bankAccountModal = new ModalParams({
			onClose: () => {
				this.bankAccountModal.data = {};
			},
		});
	}

	createConfirmModalParams() {
		this.confirmModal = new ModalParams({});
	}

	createPaymentTypeDropdownStore() {
		this.paymentTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				const tempTypes = await this.rootStore.application.lookup.paymentTypeStore.find();
				this.paymentTypes = tempTypes.filter(c => {
					return !['bill-pay', 'crypto-currency', 'credit-card', 'cash'].includes(c.abrv);
				});
				return this.paymentTypes;
			},
		});
	}

	createBankAccountDropdownStore() {
		this.bankAccountDropdownStore = new BaasicDropdownStore(
			{ initFetch: false },
			{
				fetchFunc: async () => {
					let params = {
						embed: ['accountHolder'],
						orderBy: 'dateCreated',
						orderDirection: 'desc',
					};
					params.donorId = this.item.donorId;
					return this.contributionStore.findBankAccount(params);
				},
			}
		);
	}

	createBrokerageInstitutionDropdownStore() {
		this.brokerageInstitutionDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [
					{ id: '1', name: 'Fidelity Investment' },
					{ id: '2', name: 'Charles Schwab' },
					{ id: '3', name: 'Vanguard' },
					{ id: '4', name: 'Goldman Sachs' },
					{ id: '5', name: 'E - Trade' },
					{ id: '6', name: 'TD Ameritrade ' },
					{ id: '7', name: 'Merrill Lynch' },
					{ id: '8', name: 'Interactive Brokers LLC' },
					{ id: '9', name: 'JP Morgan ' },
					{ id: '10', name: 'Morgan Stanley' },
					{ id: '11', name: 'Other' },
				];
			},
		});
	}

	createThirdPartyDonorAdvisedFundDropdownStore() {
		this.thirdPartyDonorAdvisedFundDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [
					{ id: '1', name: 'Fidelity Charitable' },
					{ id: '2', name: 'Schwab Charitable' },
					{ id: '3', name: 'JP Morgan Charitable Giving Fund' },
					{ id: '4', name: 'Vanguard Charitable Endowment Fund' },
					{ id: '5', name: 'Jewish Communal Fund' },
					{ id: '6', name: 'Goldman Sachs Philanthropy Fund' },
					{ id: '7', name: 'Greater Kansas City Community Foundation' },
					{ id: '8', name: 'The OJC Fund' },
					{ id: '9', name: 'Renaissance Charitable' },
					{ id: '10', name: 'National Philanthropic Trust' },
					{ id: '11', name: 'Jewish Federation of Metropolitan Chicago' },
					{ id: '12', name: 'Other' },
				];
			},
		});
	}

	createSecurityTypeDropdownStore() {
		this.securityTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [
					{ id: '1', name: 'Stocks' },
					{ id: '2', name: 'Mutual Funds' },
					{ id: '3', name: 'Bonds' },
					{ id: '4', name: 'Other' },
				];
			},
		});
	}

	createBusinessTypeDropdownStore() {
		this.businessTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				let params = {
					orderBy: 'dateCreated',
					orderDirection: 'desc',
				};
				return this.rootStore.application.lookup.businessTypeStore.find(params);
			},
		});
	}

	createPropertyTypeDropdownStore() {
		this.propertyTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [{ id: '1', name: 'Commercial' }, { id: '2', name: 'Residental' }];
			},
		});
	}

	createCollectibleTypeDropdownStore() {
		this.collectibleTypeDropdownStore = new BaasicDropdownStore(null, {
			fetchFunc: async () => {
				return [
					{ id: '1', name: 'Boat' },
					{ id: '2', name: 'Art' },
					{ id: '3', name: 'Accessories' },
					{ id: '4', name: 'Other' },
				];
			},
		});
	}

	createPreviousContributionsTableStore() {
		this.previousContributionsTableStore = new TableViewStore(null, {
			columns: [
				{
					key: 'dateCreated',
					title: 'CONTRIBUTION.LIST.COLUMNS.DATE_CREATED_LABEL',
					format: {
						type: 'date',
						value: 'short',
					},
				},
				{
					key: 'amount',
					title: 'CONTRIBUTION.LIST.COLUMNS.AMOUNT_LABEL',
					format: {
						type: 'currency',
						value: '$',
					},
				},
			],
		});
	}
}

export default ContributionEditViewStore;
