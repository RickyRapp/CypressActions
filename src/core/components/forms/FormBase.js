import _ from "lodash";
import { Form, Field } from "mobx-react-form";
import dvr from 'mobx-react-form/lib/validators/DVR';
import validatorjs from "validatorjs";
import moment from 'moment';
import { computed } from 'mobx';
import { validatorService, localizationService } from 'core/services';
import {
    afterDate,
    beforeDate,
    minDate,
    maxDate,
    beforeOrEqualDate,
    lessThan,
    greaterThan,
    organizationalStructureNameRegex
} from 'core/utils/validation';

var uriFormat = new RegExp(
    "^" +
    // protocol identifier (optional)
    // short syntax // still required
    "(?:(?:(?:https?):)?\\/\\/)?" +
    // user:pass BasicAuth (optional)
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    // IP address exclusion
    // private & local networks
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    // host & domain names, may end with dot
    // can be replaced by a shortest alternative
    // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
    "(?:" +
    "(?:" +
    "[a-z0-9\\u00a1-\\uffff]" +
    "[a-z0-9\\u00a1-\\uffff_-]{0,62}" +
    ")?" +
    "[a-z0-9\\u00a1-\\uffff]\\." +
    ")+" +
    // TLD identifier name, may end with dot
    "(?:[a-z\\u00a1-\\uffff]{2,}\\.?)" +
    ")" +
    // port number (optional)
    "(?::\\d{2,5})?" +
    // resource path (optional)
    "(?:[/?#]\\S*)?" +
    "$", "i"
);

const customRules = {
    array_required: {
        // eslint-disable-next-line
        rule: (value, req, attr, form) => {
            return Array.isArray(value) && value.length > 0
        },
        message: 'The :attribute must have at least 1 value'
    },
    before_or_equal_date: beforeOrEqualDate,
    before_date: beforeDate,
    after_date: afterDate,
    min_date: minDate,
    max_date: maxDate,
    greater_than: greaterThan,
    less_than: lessThan,
    org_struct_regex: organizationalStructureNameRegex,
    url: {
        // eslint-disable-next-line
        rule: (value, req, attr, form) => {
            if (value.indexOf(' ') !== -1) {
                return false;
            }

            return uriFormat.test(value);
        },
        message: 'Invalid URL.'
    }
};

class FormBase extends Form {
    constructor(hooks, fields) {
        super(
            { fields },
            {
                plugins: {
                    dvr: dvr({
                        package: validatorjs,
                        extend: ({ form, validator }) => {
                            // add custom rules
                            Object.keys(customRules).forEach(key => {
                                validator.register(key,
                                    (value, req, attr) => customRules[key].rule(value, req, attr, form),
                                    localizationService.t(customRules[key].message)
                                )
                            });
                        }
                    })
                },
                hooks,
                options: {
                    validationDebounceWait: 50,
                    validateOnChange: true,
                    // validateOnBlur: false
                    // showErrorsOnInit: true
                }
            }
        );

        if (this.getLocalizeFields().length > 0) {
            this.add({ key: 'languageMetadata', fields: [] });
        }
    }
    // eslint-disable-next-line
    update(obj, convertNullToEmptyString = false) {
        this.set('value', obj);
        this.set('initial', obj);
    }

    submit(obj) {
        // trim all inputs on submit
        const vals = this.values();
        const valKeys = Object.keys(vals);

        valKeys.forEach(vk => {
            if (typeof vals[vk] === "string") {
                vals[vk] = vals[vk].trim();
                if (vals[vk] === "true")
                    vals[vk] = true;
                else if (vals[vk] === "false")
                    vals[vk] = false;
            }
        })

        this.set('value', vals);

        super.submit(obj);
    }

    setFieldsDisabled(disabled) {
        this.each(field => field.set('disabled', disabled));
    }

    makeField(props) {
        return new FieldBase(props);
    }

    getLocalizeFields() {
        if (this.setup && _.isFunction(this.setup)) {
            return _.filter(this.setup().fields, s => s.localize);
        }

        return [];
    }
}

class FieldBase extends Field {
    initialSetup = null;

    constructor(props) {
        const setup = props.data;
        if (setup && setup.type === 'date') {
            setup.output = setup.output || ((value) => {
                return moment.utc(value).format();
            })
        }

        super({
            ...props,
            data: { ...setup }
        });

        this.initialSetup = props ? props.data : null;

        validatorService.on('onMessageSourceChange', async () => {
            if (this.showError) {
                await this.validate();
                this.showErrors(!this.isValid);
            }
        });
    }

    @computed get localizedError() {
        let err = this.error;
        return err ? err.replace(/\[[^\]]+\]/g, function
            // eslint-disable-next-line
            (match, value, a, b, c, str) {
            return localizationService.t(_.trim(match, '[]'));
        }) : null;
    }

    setRequired(isRequired) {
        if (this.rules) {
            if (isRequired) {
                if (_.isArray(this.rules)) {
                    if (_.includes(this.rules, 'required')) {
                        return;
                    }
                    else {
                        this.rules.push('required');
                    }
                }
                else {
                    if (this.rules.indexOf('required|') !== -1 || this.rules.indexOf('|required') !== -1 || this.rules.indexOf('required') !== -1) {
                        return;
                    }
                    else {
                        this.set('rules', this.rules + '|required');
                    }
                }
            }
            else {
                if (_.isArray(this.rules)) {
                    if (_.includes(this.rules, 'required')) {
                        this.rules.splice('required');
                    }
                }
                else {
                    if (this.rules.indexOf('required|') !== -1) {
                        this.set('rules', this.rules.replace('required|', ''));
                    }
                    else if (this.rules.indexOf('|required') !== -1) {
                        this.set('rules', this.rules.replace('|required', ''));
                    }
                    else if (this.rules.indexOf('required') !== -1) {
                        this.set('rules', this.rules.replace('required', ''));
                    }
                }
            }
        }
        else {
            if (isRequired) {
                this.rules.set('rules', 'required');
            }
        }
    }
}

export default FormBase;
