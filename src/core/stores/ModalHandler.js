import { ModalParams } from 'core/models';
import { action, observable } from 'mobx';

class ModalHandler {
  @observable registry = observable.map();

  constructor() {}

  @action open(modalParams) {}

  @action close(modalParams) {}
}

export default ModalHandler;
