import {
	ActivityStore,
} from 'application/activity/stores';

class ActivityModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.activityStore = new ActivityStore(this);
	}
}
export default ActivityModuleStore;
