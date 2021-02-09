import {
	InvestmentStore,
} from 'application/administration/investment/stores';

class InvestmentModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.investmentStore = new InvestmentStore(this);
	}
}
export default InvestmentModuleStore;
