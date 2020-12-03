import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { InvestmentPoolEditForm } from 'application/investment/forms';
import { action } from 'mobx';

@applicationContext
class InvestmentPoolChangeViewStore extends BaseEditViewStore {
    constructor(rootStore, onAfterAction) {
        super(rootStore, {
            name: 'investment-pool-change',
            id: 1,
            FormClass: InvestmentPoolEditForm,
            actions: () => {
                return {
                    get: async () => {
                        const params = {
                            embed: ['investmentPool']
                        }
                        const data = await rootStore.application.investment.investmentStore.findOverview(params);
                        const temp = [];

                        for (let index = 0; index < data.item.length; index++) {
                            const element = data.item[index];
                            temp.push({
                                investmentPoolId: element.investmentPoolId,
                                investmentPool: element.investmentPool,
                                totalPoolValue: element.totalPoolValue,
                                percentageChange: 0
                            });
                        }

                        return { investmentPoolHistory: temp };
                    },
                    update: async (resource) => {
                        await rootStore.application.investment.investmentStore.updatePoolChange(resource.investmentPoolHistory);
                    }
                }
            },
            onAfterAction: onAfterAction,
        });
    }

    @action.bound
    updateForm() {
        if (this.item) {
            for (let index = 0; index < this.item.investmentPoolHistory.length; index++) {
                this.form.$('investmentPoolHistory').add([this.item.investmentPoolHistory[index]])
            }

            if (this.translationStore) {
                this.translationStore.update(this.form.values());
            }
        }
    }

}

export default InvestmentPoolChangeViewStore;
