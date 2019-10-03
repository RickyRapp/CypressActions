import moment from 'moment';

export default {
    rule: function (value, req, attr, form) {
        if(value && moment(value) > moment(req)){
            return false;
        }
        return true;
    },
    message: "ERROR_MESSAGES.CUSTOM.MAX_DATE"
};