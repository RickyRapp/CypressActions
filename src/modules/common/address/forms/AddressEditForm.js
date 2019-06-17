import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class AddressEditForm extends FormBase {
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
                    name: 'addressLine1',
                    label: localizationService.t('ADDRESS.ADDRESSLINE1'),
                    rules: 'required|string',
                },
                {
                    name: 'addressLine2',
                    label: localizationService.t('ADDRESS.ADDRESSLINE2'),
                    rules: 'string',
                },
                {
                    name: 'city',
                    label: localizationService.t('ADDRESS.CITY'),
                    rules: 'required|string',
                },
                {
                    name: 'state',
                    label: localizationService.t('ADDRESS.STATE'),
                    rules: 'required|string',
                },
                {
                    name: 'zipCode',
                    label: localizationService.t('ADDRESS.ZIPCODE'),
                    rules: 'required|string',
                },
                {
                    name: 'description',
                    label: localizationService.t('ADDRESS.DESCRIPTION'),
                    rules: 'string',
                },
            ]
        }
    };
}