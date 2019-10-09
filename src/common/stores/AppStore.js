import { observable, action, computed } from 'mobx';

export default class AppStore {
    rootStore;

    _initialized = observable.box(false);

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action async initialize() {
        const { localizationStore, authStore } = this.rootStore; // eslint-disable-line

        await authStore.initialize();
        // Uncomment this if you have languages and localization!
        //await localizationStore.initialize();
        this.rootStore.setupRouter();
        this.setInitialized();        
    }

    @computed get initialized() {
        return this._initialized.get();
    }

    @action setInitialized() {
        this._initialized.set(true);
    }
}
