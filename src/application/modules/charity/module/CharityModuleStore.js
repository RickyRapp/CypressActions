import { CharityStore } from 'application/charity/charity/stores';
import { ActivityStore } from 'application/charity/activity/stores';
import { GrantStore } from 'application/charity/grant/stores';

class CharityModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.charityStore = new CharityStore(this);
		this.activityStore = new ActivityStore(this);
		this.grantStore = new GrantStore(this);
	}
}
export default CharityModuleStore;
