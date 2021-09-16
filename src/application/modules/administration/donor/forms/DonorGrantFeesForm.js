import { FormBase } from 'core/components';

export default class DonorGrantFeesForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isOnlineFeePayedByCharity',
                    label: 'DONOR.GRANT_FEES.FIELDS.ONLINE_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isGrantRequestFeePayedByCharity',
                    label: 'DONOR.GRANT_FEES.FIELDS.GRANT_REQUEST_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isCharityWebsiteFeePayedByCharity',
                    label: 'DONOR.GRANT_FEES.FIELDS.CHARITY_WEBSITE_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isGivingCardFeePayedByCharity',
                    label: 'DONOR.GRANT_FEES.FIELDS.GIVING_CARD_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isSessionFeePayedByCharity',
                    label: 'DONOR.GRANT_FEES.FIELDS.SESSION_LABEL',
                    rules: 'required|boolean',
                    type: 'checkbox'
                }
            ]
        };
    }
}
