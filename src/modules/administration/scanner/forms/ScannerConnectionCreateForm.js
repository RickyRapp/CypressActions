import { isSome } from 'core/utils'
import { localizationService } from 'core/services'
import { FormBase } from 'core/components';
import _ from 'lodash'

export default class ScannerConnectionCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'code',
                    label: localizationService.t('SCANNERCONNECTIONCREATEFORM.CODE'),
                    rules: 'required|numeric|digits:4',
                    options: {
                        validateOnChange: true
                    }
                }
            ]
        }
    }
};