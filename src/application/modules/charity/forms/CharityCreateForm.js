import { FormBase } from 'core/components';
import { donorAccountAddressFormProperties, donorAccountEmailAddressFormProperties, donorAccountPhoneNumberFormProperties } from 'application/donor-account/forms';

export default class CharityCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'CHARITY.CREATE.FIELDS.NAME_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'taxId',
                    label: 'CHARITY.CREATE.FIELDS.TAX_ID_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.TAX_ID_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'dba',
                    label: 'CHARITY.CREATE.FIELDS.DBA_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.DBA_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityTypeId',
                    label: 'CHARITY.CREATE.FIELDS.CHARITY_TYPE_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CHARITY_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'charityStatusId',
                    label: 'CHARITY.CREATE.FIELDS.CHARITY_STATUS_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CHARITY_STATUS_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'address',
                    ...donorAccountAddressFormProperties
                },
                {
                    name: 'emailAddress',
                    ...donorAccountEmailAddressFormProperties
                },
                {
                    name: 'phoneNumber',
                    ...donorAccountPhoneNumberFormProperties
                }
            ],
        };
    }
}