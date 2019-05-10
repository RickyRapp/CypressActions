import { FormBase } from 'core/components';

export default class BankAccountForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'name',
                    placeholder: 'Enter name',
                    rules: 'required|string'
                },
                {
                    name: 'accountNumber',
                    label: 'Account Number',
                    placeholder: 'Enter Account Number',
                    rules: 'required|string'
                },
                {
                    name: 'routingNumber',
                    label: 'Routing Number',
                    placeholder: 'Enter Routing Number',
                    rules: 'required|string|digits:9'
                },
                {
                    name: 'description',
                    label: 'Description',
                    placeholder: 'Enter Description',
                    rules: 'string'
                },
                {
                    name: 'image',
                    label: 'Image',
                    type: 'file'
                },
                {
                    name: 'coreMediaVaultEntryId',
                    rules: 'string'
                },
                {
                    name: 'thirdParty',
                    label: 'Third Party Bank Account',
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'thirdPartyAccountHolder',
                    label: 'Account Holder',
                    fields:
                        [{
                            name: 'firstName',
                            label: 'First Name',
                            placeholder: 'Enter First Name',
                            rules: 'string'
                        },
                        {
                            name: 'lastName',
                            label: 'Last Name',
                            placeholder: 'Enter Last Name',
                            rules: 'string'
                        },
                        {
                            name: 'address',
                            label: 'Address Information',
                            fields:
                                [{
                                    name: 'addressLine1',
                                    label: 'Address Line 1',
                                    placeholder: 'Enter Address Line 1',
                                    rules: 'string'
                                },
                                {
                                    name: 'addressLine2',
                                    label: 'Address Line 2',
                                    placeholder: 'Enter Address Line 2',
                                    rules: 'string'
                                },
                                {
                                    name: 'city',
                                    label: 'City',
                                    placeholder: 'Enter City',
                                    rules: 'string'
                                },
                                {
                                    name: 'state',
                                    label: 'State',
                                    placeholder: 'Enter State',
                                    rules: 'string'
                                },
                                {
                                    name: 'zipCode',
                                    label: 'Zip Code',
                                    placeholder: 'Enter Zip Code',
                                    rules: 'string'
                                }
                                ]
                        },
                        {
                            name: 'emailAddress',
                            label: 'Email Address Information',
                            fields:
                                [{
                                    name: 'email',
                                    label: 'Email',
                                    placeholder: 'Enter Email',
                                    rules: 'email'
                                }]
                        },
                        {
                            name: 'phoneNumber',
                            label: 'Phone Number Information',
                            fields:
                                [{
                                    name: 'number',
                                    label: 'Phone Number',
                                    placeholder: 'Enter Phone Number',
                                    rules: 'string'
                                }]
                        }
                        ]
                }
            ]
        };
    }
}
