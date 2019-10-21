import { FormBase } from 'core/components';

export default class ContributionReviewForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    rules: 'required|string'
                },
                {
                    name: 'contributionStatusId',
                    label: 'CONTRIBUTION.REVIEW.FIELDS.STATUS_LABEL',
                    placeholder: 'CONTRIBUTION.REVIEW.FIELDS.STATUS_PLACEHOLDER',
                    rules: 'required|string'
                }
            ]
        };
    }
}