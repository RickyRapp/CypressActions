import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';

class SessionViewStore extends BaseViewStore {
    steps = [1, 2, 3, 4];
    @observable currentStep = 1;
    @observable sessionKeyIdentifier = null;

    constructor(rootStore) {
        super(rootStore);
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
}

export default SessionViewStore;
