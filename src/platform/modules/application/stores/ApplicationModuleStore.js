import ApplicationStore from './ApplicationStore';

class ApplicationModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.applicationStore = new ApplicationStore(this);
    }
}

export default ApplicationModuleStore;