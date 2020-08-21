import { BaseEditViewStore } from 'core/stores';
import { InvestmentPoolHistoryService } from 'application/investment/services';
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
                const service = new InvestmentPoolHistoryService(rootStore.application.baasic.apiClient);
                return {
                    get: async () => {
                        const params = {
                            embed: ['investmentPool']
                        }
                        const response = await service.overview(params);
                        const arr = [];

                        for (let index = 0; index < response.data.length; index++) {
                            const element = response.data[index];
                            arr.push({
                                investmentPoolId: element.investmentPoolId,
                                investmentPool: element.investmentPool,
                                totalPoolValue: element.totalPoolValue,
                                percentageChange: 0
                            })
                        }

                        return { investmentPoolHistory: arr };
                    },
                    update: async (resource) => {
                        debugger
                        await service.update(resource.investmentPoolHistory);
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
