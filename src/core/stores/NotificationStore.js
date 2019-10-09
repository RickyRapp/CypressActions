import {toast} from 'react-toastify';
import {localizationService, errorFormatterService} from 'core/services';

class NotificationStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    success(message) {

        return showToast(localizationService.t(message), {
            className: 'green-background',
            bodyClassName: 'grow-font-size',
            progressClassName: 'fancy-progress-bar'
        });
    }

    warning(message) {
        return showToast(localizationService.t(message), {
            className: 'orange-background',
            bodyClassName: 'grow-font-size',
            progressClassName: 'fancy-progress-bar'
        });
    }

    error(message, data = null) {
        if(data) {
            const { headers, config, status } = data;
            errorFormatterService.getErrorObject(data.data, data.message, status, headers, config);
        }

        return showToast(localizationService.t(message), {
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
