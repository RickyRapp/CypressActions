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
            label: 'BANK_ACCOUNT.EDIT.FIELDS.NAME_LABEL',
            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.NAME_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'accountNumber',
            label: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_NUMBER_LABEL',
            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ACCOUNT_NUMBER_PLACEHOLDER',
            rules: 'required|string'
        },
        {
            name: 'routingNumber',
            label: 'BANK_ACCOUNT.EDIT.FIELDS.ROUTING_NUMBER_LABEL',
            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.ROUTING_NUMBER_PLACEHOLDER',
            rules: 'required|string|digits:9',
            extra: {
                format: '###-###-###'
            }
        },
        {
            name: 'description',
            label: 'BANK_ACCOUNT.EDIT.FIELDS.DESCRIPTION_LABEL',
            placeholder: 'BANK_ACCOUNT.EDIT.FIELDS.DESCRIPTION_PLACEHOLDER',
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
