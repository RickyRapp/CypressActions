import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class PhoneNumberEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'number',
                    label: localizationService.t('PHONENUMBER.NUMBER'),
                    rules: 'required|string',
                },
                {
                    name: 'description',
                    label: localizationService.t('PHONENUMBER.DESCRIPTION'),
                    rules: 'string',
                },
            ]
        }
    };
}