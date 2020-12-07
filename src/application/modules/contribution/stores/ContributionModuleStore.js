import {
	ContributionStore,
} from 'application/contribution/stores';

class ContributionModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.contributionStore = new ContributionStore(this);
	}
}
export default ContributionModuleStore;
