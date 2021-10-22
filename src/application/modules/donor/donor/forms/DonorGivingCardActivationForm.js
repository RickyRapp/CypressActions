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
                    label: 'DONOR_GIVING_CARD_SETTING.ACTIVATION.FIELDS.LAST_4_DIGITS',
                    rules: 'required|string',
                    extra: {
                        format: '####'
                    }
                },
                {
                    name: 'cvv',
                    label: 'DONOR_GIVING_CARD_SETTING.ACTIVATION.FIELDS.CVV_LABEL',
                    rules: 'required|string',
                    extra: {
                        format: '###'
                    }
                }
            ]
        }
    }
}
