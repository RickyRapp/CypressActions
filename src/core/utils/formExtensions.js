import _ from 'lodash'

function setRequired(field) {
    return _.startsWith('required|') ? field.rules : `required|${field.rules}`;
}

function setNonRequired(field) {
    return _.startsWith('required|') ? _.replace(field.rules, 'required|', '') : field.rules;
}

export { setRequired, setNonRequired };