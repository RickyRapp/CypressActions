import _ from 'lodash';

function runOnInit(cb, params) {
    if (cb) {
        cb(params);
    }
}

function applicationContext(Store) {
    const Injected = function (...args) {
        const result = Store.apply(this, args);
        // add observer
        const rootStore = _.first(args);
        
        if (rootStore) {
            if (rootStore.application) {
                runOnInit(result.onInit, { initialLoad: true});
            }

            this.addEvent('onInit', () => {
                runOnInit(result.onInit, { initialLoad: false });
            });
        }
        return result;
    };
    Injected.prototype = Store.prototype;

    return Injected;
}

export default applicationContext;
