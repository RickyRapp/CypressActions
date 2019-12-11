import * as _ from 'lodash';
import { localizationService } from 'core/services';

class Error {
    constructor(statusCode = null) {
        this.error = { message: 'N/A' };
        if (statusCode) {
            this.message = localizationService.t('ERROR_CODE.' + statusCode);
        }
        else {
            this.message = localizationService.t('ERROR_CODE.' + 500); //500 http status code
        }

        this.description = '';
    }
}

class ErrorFormatterService {
    constructor() {

    }

    mergeMessages = (message, dataMessage) => {
        message = message || '';
        dataMessage = dataMessage || '';

        return _.trim(message + ' ' + dataMessage);
    };

    getErrorObject = (data, message, statusCode, statusText, headers, config) => {
        let result = new Error(statusCode);
        if (!_.isUndefined(data) && !_.isNull(data)) {
            if (data.errorCode > 0 && data.errorCode <= 100000) { //TDF error codes range. 0 will not be included because of success and unhandled error.
                result.message = this.mergeMessages(message, localizationService.t('ERROR_CODE.' + data.errorCode));
            }
            else {
                if (!_.isUndefined(data.message)) {
                    result.message = message = this.mergeMessages(message, data.message);
                    if (data.details) {
                        result.message = message = this.mergeMessages(result.message, data.details);
                    }
                } else if (!_.isUndefined(message)) {
                    result.message = this.mergeMessages(result.message, this.mergeMessages(message, 'HTTP Status: ' + statusText));
                } else if (!_.isUndefined(data)) {
                    result.message = data;
                }

                if (!_.isUndefined(data.error) && !_.isNull(data.error)) {
                    result.message = this.mergeMessages(message, data.error.Message);
                    result.error = data.error;
                } else if (!_.isUndefined(data.exceptionMessage)) {
                    let exception = data;
                    while (!_.isUndefined(exception.innerException)) {
                        exception = exception.innerException;
                    }
                    result.message = this.mergeMessages(message, exception.exceptionMessage);
                    result.error = data;
                } else if (!_.isUndefined(data.message)) {
                    result.error = data;
                } else {
                    result.error = {
                        message: message,
                        data: data,
                        status: statusText,
                        headers: headers !== undefined ? headers : null,
                        config: config
                    };
                }

                if (!_.isUndefined(data.modelState)) {
                    result.message = this.mergeMessages(result.message, ' Model state is invalid.');
                }
            }
        }
        return result;
    }
}

const errorFormatterService = new ErrorFormatterService();

export default errorFormatterService;
