import { observable, action } from 'mobx';

class ModalParams {
    @observable isOpen = false;
    @observable loading = false;
    @observable data = {};

    constructor({ onClose }) {
        if (onClose) {
            this.onClose = onClose;
        }
    }

    @action.bound open(data) {
        if (this.isOpen) return;
        this.data = data;

        this.setOpen(true);
    }

    @action.bound close() {
        if (!this.isOpen) return;

        this.setOpen(false);

        if (this.onClose) {
            this.onClose();
        }
    }

    @action.bound setOpen(value) {
        this.isOpen = value;
    }

    @action.bound
    setLoading(loading) {
        this.loading = loading;
    }
}

export default ModalParams;
