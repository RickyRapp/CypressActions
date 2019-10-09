import { action, observable } from 'mobx';
import {ConfirmModalParams, ModalParams} from 'core/models';

class ModalStore {
    @observable confirmParams = new ConfirmModalParams({});
    @observable modalParams = new ModalParams({});

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @action showConfirm(message, onConfirm, onCancel) {
        this.confirmParams.setCallbacks({
            onConfirm,
            onCancel
        });

        this.confirmParams.open({
            message
        });
    }

    @action showModal() {
        this.modalParams.open();

    }
}

export default ModalStore;
