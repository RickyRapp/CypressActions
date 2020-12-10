import {
	InvestmentStore,
} from 'application/common/investment/stores';

class InvestmentModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.investmentStore = new InvestmentStore(this);
	}
}
export default InvestmentModuleStore;
