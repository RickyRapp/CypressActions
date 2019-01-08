import _ from 'lodash';
import { action, observable, computed } from 'mobx';

class LoaderStore {
    @observable _loading = observable.box(false);
    @observable pastDelay = observable.box(false);

    @computed get loading() {
        return this._loading.get() && (this.pastDelay.get() || this.initial);
    }    
    
    options = null;
    delayTimeout = null;
    initial = true;

    constructor(options) {
        this.options = Object.assign({
            delay: 100
        }, options);
    }

    destroy() {
        this.clearDelay();
    }

    @action.bound suspend = (customDelay = undefined) => {
        var self = this;
        self._loading.set(true);
        self.pastDelay.set(false);

        const delay = customDelay ? customDelay : this.options.delay;
        if (delay === 0) {
            self.pastDelay.set(true);
        } else {
            this.delayTimeout = setTimeout(() => {
                self.pastDelay.set(true);
            }, delay);
        }        
    }

    @action.bound resume = () => {
        this.initial = false;
        this._loading.set(false);
        this.pastDelay.set(true);
    }

    clearDelay() {
        clearTimeout(this.delayTimeout);
        this.delayTimeout = undefined;
    }

    @action.bound setPastDelay = () => this.pastDelay = true;
}

export default LoaderStore;