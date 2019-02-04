import { observable, action, runInAction } from 'mobx';

export default class AppStore {
  rootStore;

  @observable initialized = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action async initialize() {
    await this.rootStore.localizationStore.initialize();
    runInAction(() => (this.initialized = true));
  }
}
