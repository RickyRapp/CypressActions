import { toast } from 'react-toastify';

class NotificationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  success(message, options = { autoClose: 6000 }) {
    return showToast(message, {
      className: 'green-background',
      bodyClassName: 'grow-font-size',
      progressClassName: 'fancy-progress-bar',
      autoClose: options.autoClose
    });
  }

  warning(message, options = { autoClose: 6000 }) {
    return showToast(message, {
      className: 'orange-background',
      bodyClassName: 'grow-font-size',
      progressClassName: 'fancy-progress-bar'
    });
  }

  error(message, options = { autoClose: 6000 }) {
    return showToast(message, {
      className: 'red-background',
      bodyClassName: 'grow-font-size',
      progressClassName: 'fancy-progress-bar'
    });
  }
}

function showToast(message, options) {
  return toast(message, options);
}

export default NotificationStore;
