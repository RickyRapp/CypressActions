import {
	CharityStore,
} from 'application/charity/module';

class CharityModuleStore {
	constructor(rootStore) {
		this.rootStore = rootStore;
		this.charityStore = new CharityStore(this);
	}
}
export default CharityModuleStore;
