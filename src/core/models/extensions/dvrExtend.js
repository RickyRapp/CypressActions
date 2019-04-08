import { ContributionSettingService } from "common/data";

//TODO: not using currently, need to figure oute how to inject apiClient
//rootStore.app.baasic.apiClient
const asyncRules = {
  checkUser: (value, attr, key, passes) => {
    const msg = `Hey! The username ${value} is already taken.`;
    // show error if the call does not returns entries

    const contributionSettingService = new ContributionSettingService();
    const contributionSetting = {
      amount: 15,
      bankAccountId: '4bc6b7f9-bbe0-4106-a8a9-aa0f0107a618',
      contributionSettingTypeId: '4bc6b7f9-bbe0-4106-a8a9-aa0f0107a618',
      startDate: null,
      enabled: false,
      lowBalanceAmount: 1000,
    }
    contributionSettingService.createContributionSetting('4bc6b7f9-bbe0-4106-a8a9-aa0f0107a618', contributionSetting)
      .then((items) => (items.length === 0) ? passes() : passes(false, msg));
  },
};

const rules = {
  after_override: {
    function: (value, attr) => {
      var val1 = attr;
      var val2 = value;

      if (!isValidDate(val1)) { return false; }
      if (!isValidDate(val2)) { return false; }

      if (new Date(val1).getTime() < new Date(val2).getTime()) {
        return true;
      }
      return false;
    },
    message: "The :attribute date must be after today's date"
  },
};

export default ($validator) => {
  // // register async rules
  // Object.keys(asyncRules).forEach(key =>
  //   $validator.registerAsyncRule(key, asyncRules[key]));

  Object.keys(rules).forEach(key =>
    $validator.register(key, rules[key].function, rules[key].message));
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
