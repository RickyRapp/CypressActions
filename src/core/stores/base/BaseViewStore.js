import _ from 'lodash';
import { action, observe, reaction } from 'mobx';
import { LoaderStore } from 'core/stores';

class BaseViewStore {
    rootStore = null;
    observeDisposers = [];
    eventDisposers = [];
    loaderStore = this.createLoaderStore();
    reactDisposers = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.loaderStore.suspend();
    }

    createLoaderStore() {
        return new LoaderStore();
    }

    @action setObservable(name, value) {
        this[name] = value;
    }

    @action.bound
    async fetch(promises) {
        this.loaderStore.suspend();
        await Promise.all(promises);
        this.loaderStore.resume();
    }

    observe(target, propertyName = null, listener) {
        const disposer = observe(target, propertyName, listener);
        this.observeDisposers.push(disposer);
    }

    addEvent(eventName, func) {
        const disposer = this.rootStore.eventHandler.addEvent(eventName, func);
        this.eventDisposers.push(disposer);
        return disposer;
    }

    destroy() {
        _.each(this.observeDisposers, disposer => disposer());
        _.each(this.eventDisposers, disposer => disposer());
        _.each(this.reactDisposers, disposer => _.isFunction(disposer) && disposer());
    }

    react(target, listener, options = {}) {
        const disposer = reaction(target, listener, options);
        this.reactDisposers.push(disposer);
        return disposer;
    }
}

export default BaseViewStore;
