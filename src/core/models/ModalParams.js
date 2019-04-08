import { observable, action } from 'mobx';
import _ from 'lodash';

class ModalParams {
  @observable isOpen = false;
  @observable loading = false;
  @observable data = {};

  constructor({ onClose, notifyOutsideClick = false }) {
    if (onClose) {
      this.onClose = onClose;
    }

    if (notifyOutsideClick) {
      this.notifyOutsideClick = _.isFunction(notifyOutsideClick) ? notifyOutsideClick : this.close;
    }
    else {
      this.notifyOutsideClick = null;
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
