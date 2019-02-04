import { observable } from 'mobx';
import { ModalParams } from 'core/models';

class ConfirmModalParams extends ModalParams {
  @observable message = null;

  constructor(opts) {
    super(opts);
    this.setCallbacks(opts);
  }

  setCallbacks({ onConfirm, onCancel }) {
    var self = this;
    this.onConfirm = () => {
      self.setLoading(true);
      return Promise.resolve(onConfirm(this.data)).then(() => {
        self.setLoading(false);
        this.close();
      });
    };

    this.onCancel = onCancel || this.close;
  }
}

export default ConfirmModalParams;
