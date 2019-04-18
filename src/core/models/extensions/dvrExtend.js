import _ from "lodash";

export default ({ validator, form }) => {
  const form2 = form;
  const rules = {
    required_if: {
      function(val, req, attribute) {

        req = this.getParameters();
        let compareValue = req[1];
        if (_.isString(compareValue) && (compareValue === 'true' || compareValue === 'false')) {
          compareValue = (compareValue == 'true');
        }
        if (this.validator._objectPath(this.validator.input, req[0]) === compareValue) {
          return this.validator.getRule('required').validate(val);
        }

        return true;
      },
      message: "The :attribute is required."
    },
    after: {
      function: (value, req) => {
        let date1 = '';

        if (isValidDate(req)) {
          date1 = req;
        }
        else if (form2.$(req)) {
          date1 = form2.$(req).value;
        }

        var date2 = value;

        if (!isValidDate(date1)) { return false; }
        if (!isValidDate(date2)) { return false; }

        if (new Date(date1).getTime() < new Date(date2).getTime()) {
          return true;
        }
        return false;
      },
      message: 'The :attribute date is not valid.'
    }
  };


  Object.keys(rules).forEach((key) =>
    validator.register(key, rules[key].function, rules[key].message));
};

function leapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

function isValidDate(inDate) {
  var valid = true;

  // reformat if supplied as mm.dd.yyyy (period delimiter)
  if (typeof inDate === 'string') {
    var pos = inDate.indexOf('.');
    if ((pos > 0 && pos <= 6)) {
      inDate = inDate.replace(/\./g, '-');
    }
  }

  var testDate = new Date(inDate);
  var yr = testDate.getFullYear();
  var mo = testDate.getMonth();
  var day = testDate.getDate();

  var daysInMonth = [31, (leapYear(yr) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (yr < 1000) { return false; }
  if (isNaN(mo)) { return false; }
  if (mo + 1 > 12) { return false; }
  if (isNaN(day)) { return false; }
  if (day > daysInMonth[mo]) { return false; }

  return valid;
}
