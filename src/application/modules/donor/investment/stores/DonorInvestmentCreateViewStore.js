import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { DonorInvestmentCreateForm } from 'application/donor/investment/forms';
import { action, observable } from 'mobx';

const ErrorType = {
    PercentangeNot100: 0,
};

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
                    create: async (resource) => {
                        if (resource.pools.filter(c => c.isChecked).map(c => c.percentage).reduce((a, b) => a + b, 0) != 1) {
                            throw { type: ErrorType.PercentangeNot100 };
                        }
                        const model = {
                            donorId: this.donorId,
                            amount: resource.amount,
                            pools: resource.pools.filter(c => { return c.isChecked })
                        }
                        await rootStore.application.donor.investmentStore.invest(model)
                    }
                }
            },
            FormClass: DonorInvestmentCreateForm,
            errorActions: {
                onCreateError: ({ type }) => {
                    switch (type) {
                        case ErrorType.PercentangeNot100:
                            rootStore.notificationStore.error('Please, check percentage');
                            break;
                        default:
                            rootStore.notificationStore.success('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
        });

        this.donorId = rootStore.userStore.applicationUser.id;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.loadLookups(),
                this.loadDonor()
            ]);

            this.form.$('amount').set('rules', `${this.form.$('amount').rules}|max:${this.donor.availableBalance < 0 ? 0 : this.donor.availableBalance}`)

            this.investmentPools.forEach(c =>
                this.form.$('pools').add([
                    {
                        id: c.id,
                        isChecked: false,
                        percentage: ''
                    }])
            )
        }
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
