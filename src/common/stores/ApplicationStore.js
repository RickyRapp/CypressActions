import _ from 'lodash';
import { action, observable } from 'mobx';
import { BaasicApp } from 'baasic-sdk-reactjs';
import { moduleProviderFactory, moduleBuilder } from 'core/providers';
import { baasicKeyGenerator } from 'core/utils';
import { baasicOptions } from 'common/infrastructure';

class ApplicationStore {
    constructor(rootStore) {
        this.rootStore = rootStore;       
    }

    @observable apps = observable.map();
    @observable appIdentifier = null; // react to change of this property to detect application changes
    app = null;
    get applicationExists() { return this.app !== undefined && this.app !== null; }

    @action setApp(app) {
        this.app = app;
        this.appIdentifier = app && app.baasic ? app.baasic.getApiKey() : null;
    }

    @action extend(stores) {
        this.setApp({
            ...this.app,
            ...stores
        });
    }

    @action register(apiKey, config = {}) {
        if (apiKey === 'platform') { throw new Error('Application can\'t be initialized with platform key'); }
        if (this.applicationExists && this.appIdentifier === apiKey)
            return this.app;
        
        var app = null;
        if (!this.apps.has(apiKey)) {
            const customOptions = {
                ...baasicOptions,
                ...config
            };

            app = new BaasicApp(apiKey, {
                storageHandler: { keyGenerator: baasicKeyGenerator },
                ...customOptions
            });

            this.apps.set(apiKey, app);
        } else {
            app = this.apps.get(apiKey);
        }

        this.setApp({ baasic: app }); 

        const stores = moduleBuilder.buildStores(['application'], { appKey: apiKey });
        this.rootStore.initializeStores(stores);

        return app;
    }

    @action unregister() {
        if (this.applicationExists) {
            this.apps.delete(this.app.baasic.getApiKey());
            this.setApp(null);
        }
    }
}

export default ApplicationStore;