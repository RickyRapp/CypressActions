import { CharityService } from 'application/common/charity/services';

class CharityStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
    }

}
export default CharityStore;
