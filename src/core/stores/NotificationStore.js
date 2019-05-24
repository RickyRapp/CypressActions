import { toast } from 'react-toastify';
import _ from 'lodash';

class NotificationStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  showMessageFromResponse(response, autoClose = 5000) {
    if (this.isErrorCode(response.statusCode)) {
      if (response.data) {
        if (_.isObject(response.data)) {
          let message = response.data.message;
          if (response.data.details) {
            message = response.data.message + " - " + response.data.details;
          }
          return this.error(message, { autoClose: autoClose });
        }
        else if (_.isString(response.data)) {
          return this.error(response.data, { autoClose: autoClose });
        }
      }
    }
    else if (this.isSuccessCode(response.statusCode)) {
      if (response.data) {
        if (_.isObject(response.data)) {
          let message = response.data.message;
          if (response.data.details) {
            message = response.data.message + " - " + response.data.details;
          }
          return this.success(message, { autoClose: autoClose });
        }
        else if (_.isString(response.data)) {
          return this.success(response.data, { autoClose: autoClose });
        }
      }
    }
  }

  isErrorCode(statusCode) {
    return statusCode >= 400 && statusCode < 506;
  }

  isSuccessCode(statusCode) {
    return statusCode >= 200 && statusCode < 207;
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
      progressClassName: 'fancy-progress-bar',
      autoClose: options.autoClose
    });
  }

  error(message, options = { autoClose: 6000 }) {
    return showToast(message, {
      className: 'red-background',
      bodyClassName: 'grow-font-size',
      progressClassName: 'fancy-progress-bar',
      autoClose: options.autoClose
    });
  }
}

function showToast(message, options) {
  return toast(message, options);
}

export default NotificationStore;
