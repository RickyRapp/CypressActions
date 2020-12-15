import { FormBase } from 'core/components';

export default class GrantRequestCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'amount',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'CHARITY_GIVING_CARD.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'cardNumber',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.CARD_NUMBER_LABEL',
                    rules: 'required|string|size:16',
                    options: {
                        validateOnChange: false
                    },
                    extra: {
                        format: '#### #### #### ####'
                    }
                },
                {
                    name: 'expirationDate',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.EXPIRATION_DATE_LABEL',
                    placeholder: 'CHARITY_GIVING_CARD.CREATE.FIELDS.EXPIRATION_DATE_PLACEHOLDER',
                    rules: 'required|string|size:4',
                    options: {
                        validateOnChange: false
                    },
                    extra: {
                        format: (val) => {
                            const limit = (val, max) => {
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

                            let month = limit(val.substring(0, 2), '12');
                            let year = val.substring(2, 4);

                            return month + (year.length ? '/' + year : '');
                        },
                        mask: ['M', 'M', 'Y', 'Y']
                    }
                },
                {
                    name: 'cvv',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.CVV_LABEL',
                    rules: 'required|string|size:3',
                    options: {
                        validateOnChange: false
                    },
                    extra: {
                        format: '###'
                    }
                },
                {
                    name: 'note',
                    label: 'CHARITY_GIVING_CARD.CREATE.FIELDS.NOTE_LABEL',
                    placeholder: 'CHARITY_GIVING_CARD.CREATE.FIELDS.NOTE_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}