import { FormBase } from 'core/components';
import { charityEmailAddressFormProperties, charityPhoneNumberFormProperties } from 'application/charity/forms';

export default class CharityEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'CHARITY.EDIT.FIELDS.NAME_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'dba',
                    label: 'CHARITY.EDIT.FIELDS.DBA_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.DBA_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityTypeId',
                    label: 'CHARITY.EDIT.FIELDS.CHARITY_TYPE_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.CHARITY_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'charityStatusId',
                    label: 'CHARITY.EDIT.FIELDS.CHARITY_STATUS_LABEL',
                    placeholder: 'CHARITY.EDIT.FIELDS.CHARITY_STATUS_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'contactInformation',
                    fields: [
                        {
                            name: 'name',
                            label: 'CHARITY.EDIT.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                            rules: 'required|string'
                        },
                        {
                            name: 'emailAddress',
                            ...charityEmailAddressFormProperties
                        },
                        {
                            name: 'phoneNumber',
                            ...charityPhoneNumberFormProperties
                        }
                    ]
                }
            ],
        };
    }
}