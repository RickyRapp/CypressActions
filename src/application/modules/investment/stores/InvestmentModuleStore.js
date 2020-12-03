import {
	InvestmentStore,
} from 'application/investment/stores';

class InvestmentModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.investmentStore = new InvestmentStore(this);
	}
}
export default InvestmentModuleStore;
