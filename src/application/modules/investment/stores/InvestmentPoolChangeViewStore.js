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
                        this.investmentPoolsHistory = response.data;
                        return {
                            aggressiveGrowthName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'aggressive-growth' }).investmentPool.name,
                            aggressiveGrowthPoolValue: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'aggressive-growth' }).totalPoolValue,
                            aggressiveGrowthChange: 0,
                            balancedName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'balanced' }).investmentPool.name,
                            balancedPoolValue: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'balanced' }).totalPoolValue,
                            balancedChange: 0,
                            conservativeIncomeName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'conservative-income' }).investmentPool.name,
                            conservativeIncomePoolValue: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'conservative-income' }).totalPoolValue,
                            conservativeIncomeChange: 0,
                            growthName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'growth' }).investmentPool.name,
                            growthPoolValue: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'growth' }).totalPoolValue,
                            growthChange: 0,
                            incomeName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'income' }).investmentPool.name,
                            incomePoolValue: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'income' }).totalPoolValue,
                            incomeChange: 0,
                            moderateGrowthName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'moderate-growth' }).investmentPool.name,
                            moderateGrowthPoolValue: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'moderate-growth' }).totalPoolValue,
                            moderateGrowthChange: 0,
                            moderateIncomeName: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'moderate-income' }).investmentPool.name,
                            moderateIncomePoolValue: this.investmentPoolsHistory.find(item => { return item.investmentPool.abrv === 'moderate-income' }).totalPoolValue,
                            moderateIncomeChange: 0
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
