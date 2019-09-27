import { BaseViewStore } from 'core/stores';
import { action, observable } from 'mobx';
import { SessionService } from "common/data";
import { isSuccessCode } from 'core/utils'
import _ from 'lodash';

class ScanningViewStore extends BaseViewStore {
    @observable currentStep = 0;
    @observable sessionKeyIdentifier = null;
    @observable certificates = [];
    @observable connectionId = null;

    constructor(rootStore) {
        super(rootStore);

        this.isSuccessCode = isSuccessCode;
        this.rootStore = rootStore;
        this.steps = [1, 2, 3, 4];
        this.currentStep = 1;
    }

    @action.bound nextStep(step) {
        if (step) {
            this.currentStep = step;
        }
        else {
            ++this.currentStep;
        }
    }

    @action.bound previousStep() {
        --this.currentStep;
    }

    @action.bound setSessionKeyIdentifier(key) {
        this.sessionKeyIdentifier = key;
    }

    @action.bound setExistingCertificates(certificates) {
        if (certificates && certificates.length > 0) {
            this.certificates = certificates;
        }
    }

    @action.bound async setConnectionId(connectionId) {
        this.connectionId = connectionId;
        const sessionService = new SessionService(this.rootStore.app.baasic.apiClient);
        try {
            const response = await sessionService.setConnectionId({ id: connectionId });
            if (this.isSuccessCode(response.statusCode)) {
                this.rootStore.notificationStore.success('Connected');
            }
            else {
                this.rootStore.notificationStore.success('Something Went Wrong. Log Out and Log In again');
            }
        } catch (errorResponse) {
            this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
        }
    }

    @action.bound addNewCertificate(certificate) {
        this.certificates.push(certificate);
    }

}

export default ScanningViewStore;
