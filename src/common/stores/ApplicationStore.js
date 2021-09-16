import { action, observable } from 'mobx';
import { BaasicApp } from 'baasic-sdk-reactjs';
import { baasicOptions } from 'common/infrastructure';

class ApplicationStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable apps = observable.map();
    @observable applicationIdentifier = observable.box(null); // react to change of this property to detect application changes
    app = null;
    apiClient = null;
    get applicationExists() { return this.app !== undefined && this.app !== null; }

    @action setApp(app) {
        this.app = app;
        this.applicationIdentifier.set(app ? app.baasic.getApiKey() : null);
    }

    @action register(application, config = {}) {
        const {appId: apiKey} = application; // application identifier is api key

        let app = null;
        if (!this.apps.has(apiKey)) {
            const customOptions = {
                ...baasicOptions,
                ...config
            };
            app = new BaasicApp(apiKey, {
                ...customOptions,
            });

            this.apps.set(apiKey, app);
        } else {
            app = this.apps.get(apiKey);
        }

        this.setApp({ baasic: app });

        return app;
    }
}

export default ApplicationStore;
