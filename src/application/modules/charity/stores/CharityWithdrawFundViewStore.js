import { CharityWithdrawFundForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';

@applicationContext
class CharityWithdrawFundViewStore extends BaseEditViewStore {
    constructor(rootStore, props) {
        super(rootStore, {
            name: 'charity',
            id: props.charityId,
            autoInit: false,
            actions: () => {
                return {
                    get: async () => {
                        return props.charity;
                    },
                    update: async (resource) => {
                        await this.rootStore.application.charity.charityStore.withdrawFundCharity(resource);
                    }
                }
            },
            FormClass: CharityWithdrawFundForm,
        });

        this.createPaymentTypeDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource(this.id)
            ]);
            this.form.$('amount').set('rules', this.form.$('amount').rules + `|max:${this.item.availableBalance}`);
        }
    }


    createPaymentTypeDropdownStore() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const data = await this.rootStore.application.lookup.paymentTypeStore.find();
                    const availablePaymentTypes = ['check', 'ach'];
                    return data.filter(c => { return availablePaymentTypes.includes(c.abrv) })
                }
            });
    }
}

export default CharityWithdrawFundViewStore;
