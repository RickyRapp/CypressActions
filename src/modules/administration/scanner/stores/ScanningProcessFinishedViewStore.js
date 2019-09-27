import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';

class ScanningProcessFinishedViewStore extends BaseViewStore {
    @observable currentCount = 30;

    constructor(rootStore, nextStep) {
        super(rootStore);
        this.rootStore = rootStore;

        setInterval(this.timer, 1000);
        this.nextStep = nextStep;
    }

    @action.bound timer() {
        --this.currentCount;
        if (this.currentCount == 0) {
            this.nextStep(1);
        }
    }
}

export default ScanningProcessFinishedViewStore;
