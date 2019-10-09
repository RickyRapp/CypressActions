import * as _ from 'lodash';

class Error {
    constructor() {
        this.error = {message: 'N/A'};
        this.message = 'Unhandled error occurred, please contact support team.';
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

    getErrorObject = (data, message, status, headers, config) => {
        let result = new Error();
        if (!_.isUndefined(data) && !_.isNull(data)) {
            if (!_.isUndefined(data.message)) {
                result.message = message = this.mergeMessages(message, data.message);
            } else if (!_.isUndefined(message)) {
                result.message = this.mergeMessages(result.message, this.mergeMessages(message, 'HTTP Status: ' + status));
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
                    status: status,
                    headers: headers !== undefined ? headers : null,
                    config: config
                };
            }

            if (!_.isUndefined(data.modelState)) {
                result.message = this.mergeMessages(result.message, ' Model state is invalid.');
            }
        }
        return result;
    }
}

const errorFormatterService = new ErrorFormatterService();

export default errorFormatterService;
