import { RouterState } from 'mobx-state-router';

export default function noApplicationRedirectPromise(rootStore, route) {
    if (!rootStore.applicationStore.applicationExists) {
        return Promise.reject(new RouterState(route));
    }

    return Promise.resolve();
}