import { observable, action } from 'mobx';
import { errorFormatterService } from 'core/services';

class ErrorStore {
    internalException = null;
    @observable error = null;

    constructor(rootStore) {
        this.rootStore = rootStore;

        this.initialize();
    }

    @action setError = (error) => {
        this.error = error;
    };

    initialize() {
        const self = this;

        window.addEventListener('unhandledrejection', (event) => {
            event.stopPropagation();
            event.preventDefault();

            const {
                reason
            } = event;

            if (typeof reason === 'object') {
                if (reason.request !== undefined && reason.statusCode !== undefined) {
                    return handleApiError(self.rootStore, reason);
                }
            }

            return true;
        });

        window.addEventListener('error', (event) => {
            event.stopPropagation();
            event.preventDefault();
            self.setError({ title: 'Something went wrong. Please contact support.' });
            self.rootStore.routerStore.goTo('error')
        });
    }
}

function handleApiError(rootStore, reason) {
    const {data, message, statusCode, headers, config} = reason;
    if (statusCode === 401 || statusCode === 403) {
        rootStore.authStore.syncToken();
        if (rootStore.authStore.isAuthenticated) {
            return rootStore.routerStore.goTo('unauthorized');
        } else {
            return rootStore.navigateLogin();
        }
    }

    let error = errorFormatterService.getErrorObject(data, message, statusCode, headers, config);

    rootStore.errorStore.setError(error);
    if (rootStore.routerStore.routerState.routerName !== 'error') {
        rootStore.routerStore.goTo('error');
    }
}

export default ErrorStore;
