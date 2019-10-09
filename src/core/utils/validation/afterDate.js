import moment from 'moment';

export default {
    rule: function (value, req, attr, form) {
        const vals = form.values();
        
        /* (form.select(attr)).resetValidation();
        (form.select(req)).resetValidation();
         */
        if(vals[req] && vals[attr]){
            if(moment(vals[req]) > moment(vals[attr]))
                return false;
        }
        return true;
    },
    message: 'ERROR_MESSAGES.CUSTOM.AFTER_DATE'
};