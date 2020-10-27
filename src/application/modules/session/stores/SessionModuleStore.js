import {
    SessionStore,
} from 'application/session/stores';

class SessionModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.sessionStore = new SessionStore(this);
    }
}
export default SessionModuleStore;
