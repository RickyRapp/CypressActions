import { observable } from 'mobx';
import { BaseEditViewStore } from 'core/stores';
import { InvestmentPoolHistoryService } from 'application/investment/services';
import { applicationContext } from 'core/utils';
import { InvestmentPoolEditForm } from 'application/investment/forms';

@applicationContext
class InvestmentPoolChangeViewStore extends BaseEditViewStore {
    @observable investmentPoolsHistory = null;

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
                        this.investmentPoolsHistory = response.data.item;
                        return {
                            aggressiveGrowthName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'aggressive-growth' }).investmentPool.name,
                            aggressiveGrowthChange: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'aggressive-growth' }).change,
                            balancedName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'balanced' }).investmentPool.name,
                            balancedChange: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'balanced' }).change,
                            conservativeIncomeName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'conservative-income' }).investmentPool.name,
                            conservativeIncomeChange: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'conservative-income' }).change,
                            growthName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'growth' }).investmentPool.name,
                            growthChange: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'growth' }).change,
                            incomeName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'income' }).investmentPool.name,
                            incomeChange: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'income' }).change,
                            moderateGrowthName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'moderate-growth' }).investmentPool.name,
                            moderateGrowthChange: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'moderate-growth' }).change,
                            moderateIncomeName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'moderate-income' }).investmentPool.name,
                            moderateIncomeChange: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'moderate-income' }).change
                        }
                    },
                    update: async (resource) => {
                        await service.update({ ...resource });
                    }
                }
            },
            onAfterAction: onAfterAction,
        });
    }
}

export default InvestmentPoolChangeViewStore;
