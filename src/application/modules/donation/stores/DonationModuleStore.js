import {
	DonationStore,
} from 'application/donation/stores';

class DonationModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.donationStore = new DonationStore(this);
	}
}
export default DonationModuleStore;
