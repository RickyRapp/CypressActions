import { FormBase } from 'core/components';

export default class CharityDescriptionForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'description',
                    label: 'CHARITY.DESCRIPTION.FIELDS.CHANGE_DESCRIPTION_LABEL',
                    placeholder: 'CHARITY.DESCRIPTION.FIELDS.CHANGE_DESCRIPTION_PLACEHOLDER',
                    rules: 'string',
                    type: "text"
                },
            ]
        };
    }
}