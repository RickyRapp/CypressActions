import { isSome } from 'core/utils'
import { localizationService } from 'core/services'
import { FormBase } from 'core/components';
import _ from 'lodash'

export default class SessionInformationCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'fullName',
                    label: localizationService.t('SESSIONINFORMATIONCREATEFORM.FULLNAME'),
                    rules: 'required|string'
                },
                {
                    name: 'phoneNumber',
                    label: localizationService.t('SESSIONINFORMATIONCREATEFORM.PHONENUMBER'),
                    rules: 'required|string'
                },
                {
                    name: 'email',
                    label: localizationService.t('SESSIONINFORMATIONCREATEFORM.EMAIL'),
                    rules: 'email'
                },
                {
                    name: 'charityName',
                    label: localizationService.t('SESSIONINFORMATIONCREATEFORM.CHARITYNAME'),
                    rules: 'required|string'
                },
                {
                    name: 'taxId',
                    label: localizationService.t('SESSIONINFORMATIONCREATEFORM.TAXID'),
                    rules: 'string'
                },
                {
                    name: 'charityEmail',
                    label: localizationService.t('SESSIONINFORMATIONCREATEFORM.CHARITYEMAIL'),
                    rules: 'email'
                },
                {
                    name: 'description',
                    label: localizationService.t('SESSIONINFORMATIONCREATEFORM.DESCRIPTION'),
                    rules: 'string'
                },
                {
                    name: 'key',
                    rules: 'numeric|digits:5'
                }
            ]
        }
    }
};