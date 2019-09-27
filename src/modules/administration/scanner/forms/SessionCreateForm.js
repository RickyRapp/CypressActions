import { isSome } from 'core/utils'
import { localizationService } from 'core/services'
import { FormBase } from 'core/components';
import _ from 'lodash'

export default class SessionCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'key',
                    label: localizationService.t('SESSIONCREATEFORM.KEY'),
                    rules: 'required|numeric|digits:5'
                },
            ]
        }
    }
};