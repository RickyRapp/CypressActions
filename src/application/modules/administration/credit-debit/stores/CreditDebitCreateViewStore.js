import { action } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CreditDebitCreateForm } from 'application/administration/credit-debit/forms';
import { ModalParams } from 'core/models';

@applicationContext
class CreditDebitCreateViewStore extends BaseEditViewStore {
	donor = null;
	applicationDefaultSetting = {};

	constructor(rootStore, { donorId, creditDebitStore }) {
		super(rootStore, {
			name: 'credit-debit-create',
			id: undefined,
			autoInit: false,
			actions: () => {
				return {
					create: async resource => {
						resource.donorId = this.donorId;
						await this.creditDebitStore.createCreditDebit(resource);
					},
				};
			},
			FormClass: CreditDebitCreateForm,
		});

		this.donorId = donorId;
		this.creditDebitStore = creditDebitStore;

		this.advancedSearchModal = new ModalParams({});
	}

	@action.bound
	async onInit({ initialLoad }) {
		if (!initialLoad) {
			this.rootStore.routerStore.goBack();
		} else {
			await this.fetch([this.setDonor()]);
			// amount rules
			// this.form.$('amount').set('rules', `${this.form.$('amount').rules}|max:${(this.donor.presentBalance + this.donor.lineOfCredit) < 0 ? 0 : (this.donor.presentBalance + this.donor.lineOfCredit)}`);

			this.setFormDefaultRules();
		}
	}

	@action.bound
	async setDonor() {
		this.donor = await this.creditDebitStore.getDonorInformation(this.donorId);
	}

	@action.bound
	setFormDefaultRules() {
		if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
			this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
		}
	}

}

export default CreditDebitCreateViewStore;
