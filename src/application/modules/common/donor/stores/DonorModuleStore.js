import {
    DonorStore,
} from 'application/donor/stores';

class DonorModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.donorStore = new DonorStore(this);
    }
}
export default DonorModuleStore;
