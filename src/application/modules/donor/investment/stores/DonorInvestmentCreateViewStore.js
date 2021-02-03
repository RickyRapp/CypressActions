import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { DonorInvestmentCreateForm } from 'application/donor/investment/forms';
import { action, observable } from 'mobx';

@applicationContext
class DonorInvestmentPoolViewStore extends BaseEditViewStore {
    @observable investmentPools = [];
    @observable step = 1;
    @observable donor = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-investment-create',
            id: undefined,
            actions: () => {
                return {
                    create: async () => {
                        await rootStore.application.investment.investmentStore.invest(this.investmentPools.filter(c => { return c.checked }))
                    }
                }
            },
            FormClass: DonorInvestmentCreateForm
        });

        this.donorId = rootStore.userStore.applicationUser.id;

        this.loadLookups();
        this.loadDonor();
    }

    @action.bound
    onNextStepClick() {
        this.step = this.step + 1;
    }

    async loadLookups() {
        let tempInvestmentPools = await this.rootStore.application.lookup.investmentPoolStore.find();
        this.investmentPools = tempInvestmentPools.map(c => { return { ...c, checked: false, amount: 0, donorId: this.donorId } });
    }

    async loadDonor() {
        this.donor = await this.rootStore.application.donor.donorStore.getDonor(this.donorId, { fields: ['availableBalance'] });
    }
}

export default DonorInvestmentPoolViewStore;
