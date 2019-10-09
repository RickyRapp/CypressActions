import _ from 'lodash';
import { observe } from 'mobx';

function observeQueryParams(rootStore, configuration, fireImmediatelly) {
    const invokeFunc = (newParams, oldParams) => {
        _.forOwn(configuration, (callback, key) => {
            if (newParams[key] !== oldParams[key]) {
                callback(newParams[key], oldParams[key]);
            }
        });
    }

    observe(
        rootStore.routerStore,
        'routerState',
        (change) => {
            invokeFunc(change.newValue.queryParams, change.oldValue.queryParams);
        }
    )
    
    if (fireImmediatelly) {
        invokeFunc(rootStore.routerStore.routerState.queryParams, {});
    }
}

export {
    observeQueryParams
}