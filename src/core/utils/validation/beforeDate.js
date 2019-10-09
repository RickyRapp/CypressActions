import moment from 'moment';

export default {
    rule: function (value, req, attr, form) {
        const vals = form.values();
        /* 
        (form.select(attr)).resetValidation();
        (form.select(req)).resetValidation(); */

        if(vals[req] && vals[attr]){
            if(moment(vals[attr]) > moment(vals[req]))
                return false;
        }
        return true;
    },
    message: 'ERROR_MESSAGES.CUSTOM.BEFORE_DATE'
};