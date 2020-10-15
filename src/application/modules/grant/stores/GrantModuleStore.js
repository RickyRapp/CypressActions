import {
	GrantStore,
} from 'application/grant/stores';

class GrantModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.grantStore = new GrantStore(this);
	}
}
export default GrantModuleStore;
