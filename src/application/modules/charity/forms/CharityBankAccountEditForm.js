import { FormBase } from 'core/components';
import { charityAddressFormProperties, charityEmailAddressFormProperties } from 'application/charity/forms';

export const charityBankAccountFormProperties = {
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
            rules: 'required|string|digits:9',
            extra: {
                format: '###-###-###'
            }
        },
        {
            name: 'description',
            label: 'BANK_ACCOUNT.EDIT.FIELDS.DESCRIPTION_FIELD',
        },
        {
            name: 'accountHolder',
            fields: [
                {
                    name: 'address',
                    ...charityAddressFormProperties
                },
                {
                    name: 'emailAddress',
                    ...charityEmailAddressFormProperties
                }
            ]
        }
    ]
}

export default class CharityBankAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return charityBankAccountFormProperties;
    }
}
