export default {
    rule: (value, req, attr, form) => {
        const vals = form.values();
    
        (form.select(attr)).resetValidation();
        (form.select(req)).resetValidation();
        
        if((vals[req] || vals[req] == 0) && (vals[attr] || vals[attr] == 0)){
            if(vals[attr] >= vals[req])
                return false;
        }
        return true;
    },
    message: 'ERROR_MESSAGES.CUSTOM.LESS_THAN'
};