import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';

class SessionViewStore extends BaseViewStore {
    steps = [1, 2, 3, 4];
    @observable currentStep = 1;
    @observable sessionKeyIdentifier = null;

    constructor(rootStore) {
        super(rootStore);

        const key = rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.key;
        if (key) {
            this.setSessionKeyIdentifier(key);
            this.nextStep(3);
            rootStore.routerStore.setQueryParams(null);
        }
    }

    @action.bound
    nextStep(step) {
        if (step) {
            this.currentStep = step;
        }
        else {
            ++this.currentStep;
        }
    }

    @action.bound
    previousStep() {
        --this.currentStep;
    }

    @action.bound
    setSessionKeyIdentifier(key) {
        this.sessionKeyIdentifier = key;
    }

    @action.bound
    handleResponse(data, err) {
        if (data.statusCode === 4000000001) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.SCANNER_CONNECTION_NOT_INITIALIZED_ERROR', err);
        }
        else if (data.statusCode === 4000000002) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.SESSION_ALREADY_ACTIVE_ERROR', err);
        }
        else if (data.statusCode === 4000000003) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.BARCODE_NOT_FOUND_ERROR', err);
        }
        else if (data.statusCode === 4000000004) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.CERTIFICATE_NOT_CLEAN_ERROR', err);
        }
        else if (data.statusCode === 4000000005) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.BOOKLET_NOT_ASSIGNED_ERROR', err);
        }
        else if (data.statusCode === 4000000006) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.CERTIFICATE_NOT_ACTIVE_ERROR', err);
        }
        else if (data.statusCode === 4000000007) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.CHARITY_NOT_ACTIVE_ERROR', err);
        }
        else if (data.statusCode === 4000000008) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.CERTIFICATE_ALREADY_USED_IN_OPEN_SESSION_ERROR', err);
        }
        else if (data.statusCode === 4000000009) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.INSUFFICIENT_FUNDS_ERROR', err);
        }
        else if (data.statusCode === 4000000010) {
            this.rootStore.notificationStore.error('SESSION.STATUS_CODE.CERTIFICATE_ALREADY_SCANNED_ERROR', err);
        }
        else {
            this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
        }
        return true;
    }
}

export default SessionViewStore;
