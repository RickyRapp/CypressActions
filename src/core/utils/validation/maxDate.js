import moment from 'moment';

export default {
    rule: function 
    // eslint-disable-next-line
    (value, req, attr, form) {
        if(value && moment(value) > moment(req)){
            return false;
        }
        return true;
    },
    message: 'ERROR_MESSAGES.CUSTOM.MAX_DATE'
};