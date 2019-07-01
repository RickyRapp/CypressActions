import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class EmailAddressCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'email',
                    label: localizationService.t('EMAILADDRESS.EMAIL'),
                    rules: 'required|email',
                },
                {
                    name: 'description',
                    label: localizationService.t('EMAILADDRESS.DESCRIPTION'),
                    rules: 'string',
                },
            ]
        }
    };
}