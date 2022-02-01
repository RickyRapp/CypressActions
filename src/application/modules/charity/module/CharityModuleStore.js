import { CharityStore } from 'application/charity/charity/stores';
import { ActivityStore } from 'application/charity/activity/stores';
import { GrantStore } from 'application/charity/grant/stores';
import { DonorStore } from 'application/charity/donor/stores';
class CharityModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.charityStore = new CharityStore(this);
		this.activityStore = new ActivityStore(this);
		this.grantStore = new GrantStore(this);
		this.donorStore = new DonorStore(this);
	}
}
export default CharityModuleStore;
