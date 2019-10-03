import moment from 'moment';

export default {
    rule: function (val, date, attr) {
        const formatedVal = moment(val).format('YYYY-MM-DD');
        const formatedDate = moment(date).format('YYYY-MM-DD');
        let isValid = formatedDate && formatedVal ? moment(formatedDate).isAfter(moment(formatedVal)) || moment(formatedDate).isSame(moment(formatedVal)) : true;
        return isValid;
    },
    message: "ERROR_MESSAGES.CUSTOM.BEFORE_OR_EQUAL"
};