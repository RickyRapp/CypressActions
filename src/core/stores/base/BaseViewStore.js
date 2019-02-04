import _ from 'lodash';
import { action, observe } from 'mobx';
import { LoaderStore } from 'core/stores';

class BaseViewStore {
  rootStore = null;
  observeDisposers = [];
  loaderStore = this.createLoaderStore();

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  createLoaderStore() {
    return new LoaderStore();
  }

  @action setObservable(name, value) {
    this[name] = value;
  }

  async fetch(promises) {
    this.loaderStore.suspend();
    await Promise.all(promises);
    this.loaderStore.resume();
  }

  observe(target, propertyName = null, listener) {
    const disposer = observe(target, propertyName, listener);
    this.observeDisposers.push(disposer);
  }

  destroy() {
    _.each(this.observeDisposers, disposer => disposer());
  }
}

export default BaseViewStore;
