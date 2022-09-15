import { FormBase } from 'core/components';

export default class CharityBankAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    label: '',
                    placeholder: ''
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
                        mask: '_',
                        format: '###-###-###'
                    }
                },
                {
                    name: 'coreMediaVaultEntryId',
                    rules: 'string'
                },
                {
                    name: 'isPrimary',
                    label: 'Is primary?',
                    rules: 'boolean',
                    type: 'checkbox',
                    value: false
                },
                {
                    name: 'isDisabled',
                    label: 'Is disabled?',
                    rules: 'boolean',
                    type: 'checkbox',
                    value: false
                }
            ]
        }
    }
}