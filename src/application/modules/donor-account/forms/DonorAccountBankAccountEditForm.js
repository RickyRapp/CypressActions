import { FormBase } from 'core/components';
import { donorAccountAddressFormProperties, donorAccountEmailAddressFormProperties, donorAccountPhoneNumberFormProperties } from 'application/donor-account/forms';

export default class DonorAccountBankAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    rules: 'string'
                },
                {
                    name: 'name',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.NAME_FIELD',
                    rules: 'required|string'
                },
                {
                    name: 'accountNumber',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_NUMBER_FIELD',
                    rules: 'required|string'
                },
                {
                    name: 'routingNumber',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.ROUTING_NUMBER_FIELD',
                    rules: 'required|string|digits:9'
                },
                {
                    name: 'description',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.DESCRIPTION_FIELD',
                },
                {
                    name: 'isThirdPartyAccount',
                    label: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_BANK_ACCOUNT_FIELD',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'accountHolder',
                    fields: [
                        {
                            name: 'name',
                            label: 'BANK_ACCOUNT.EDIT.FIELDS.THIRD_PARTY_ACCOUNT_HOLDER_NAME_FIELD',
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
                    ]
                }
            ]
        };
    }
}
