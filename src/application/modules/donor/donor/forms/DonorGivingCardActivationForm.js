import { FormBase } from 'core/components';

export default class DonorGivingCardActivationForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'cardNumber',
                    label: 'DONOR_GIVING_CARD_SETTING.ACTIVATION.FIELDS.CARD_NUMBER_LABEL',
                    rules: 'required|string',
                    extra: {
                        format: '####-####-####-####'
                    }
                },
                {
                    name: 'cvv',
                    label: 'DONOR_GIVING_CARD_SETTING.ACTIVATION.FIELDS.CVV_LABEL',
                    rules: 'required|string',
                    extra: {
                        format: '###'
                    }
                },
                {
                    name: 'expirationDate',
                    label: 'DONOR_GIVING_CARD_SETTING.ACTIVATION.FIELDS.EXPIRATION_DATE_LABEL',
                    placeholder: 'DONOR_GIVING_CARD_SETTING.ACTIVATION.FIELDS.EXPIRATION_DATE_PLACEHOLDER',
                    rules: 'required|string',
                    extra: {
                        format: (val) => {
                            let month = limit(val.substring(0, 2), '12');
                            let year = val.substring(2, 4);
                            return month + (year.length ? '/' + year : '');

                            function limit(val, max) {
                                if (val.length === 1 && val[0] > max[0]) {
                                    val = '0' + val;
                                }

                                if (val.length === 2) {
                                    if (Number(val) === 0) {
                                        val = '01';

                                        //this can happen when user paste number
                                    } else if (val > max) {
                                        val = max;
                                    }
                                }

                                return val;
                            }
                        }
                    }
                }
            ]
        }
    }
}
