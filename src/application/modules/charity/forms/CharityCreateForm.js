import { FormBase } from 'core/components';
import {
    donorAccountAddressFormProperties,
    donorAccountEmailAddressFormProperties,
    donorAccountPhoneNumberFormProperties,
    donorAccountBankAccountFormProperties
} from 'application/donor-account/forms';

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
                    rules: 'required|string|size:10'
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
                    rules: 'required|string'
                },
                {
                    name: 'charityStatusId',
                    label: 'CHARITY.CREATE.FIELDS.CHARITY_STATUS_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CHARITY_STATUS_PLACEHOLDER',
                    rules: 'required|string'
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
                    name: 'contactInformation',
                    fields: [
                        {
                            name: 'name',
                            label: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.CONTACT_INFORMATION_NAME_PLACEHOLDER',
                            rules: 'required|string'
                        },
                        {
                            name: 'emailAddress',
                            ...donorAccountEmailAddressFormProperties
                        },
                        {
                            name: 'phoneNumber',
                            ...donorAccountPhoneNumberFormProperties
                        },
                    ]
                },
                {
                    name: 'bankAccount',
                    ...donorAccountBankAccountFormProperties
                }
            ],
        };
    }
}