export default {
    rule: function (value, req, attr, form) {
        var re = new RegExp("^(?:[a-ž]|\\d|\\s|_|-|\\.)+$", "gi");
        return re.test(value)
    },
    message: "ERROR_MESSAGES.CUSTOM.ORG_STRUCT_REGEX"
};