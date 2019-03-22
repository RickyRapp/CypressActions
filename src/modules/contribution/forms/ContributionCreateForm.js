import { FormBase } from 'core/components';

export default class ContributionCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'amount',
                    label: 'Amount',
                    placeholder: 'Enter Amount',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'description',
                    label: 'Description',
                    placeholder: 'Enter Description',
                    rules: 'string'
                },
                {
                    name: 'paymentTypeId',
                    label: 'Payment Type',
                    rules: 'required|string'
                },
                {
                    name: 'bankAccountId',
                    label: 'Bank Account',
                    rules: 'string',
                    options: {
                        validateOnChange: true,
                    }
                },
                {
                    name: 'payerInformation',
                    label: 'Payer Information',
                    fields:
                        [{
                            name: 'firstName',
                            label: 'Payer First Name',
                            placeholder: 'Enter Payer First Name',
                            rules: 'required|string'
                        },
                        {
                            name: 'lastName',
                            label: 'Payer Last Name',
                            placeholder: 'Enter Payer Last Name',
                            rules: 'required|string'
                        },
                        {
                            name: 'address',
                            label: 'Payer Address Information',
                            fields:
                                [{
                                    name: 'addressLine1',
                                    label: 'Payer Address Line 1',
                                    placeholder: 'Enter Payer Address Line 1',
                                    rules: 'required|string'
                                },
                                {
                                    name: 'addressLine2',
                                    label: 'Payer Address Line 2',
                                    placeholder: 'Enter Payer Address Line 2',
                                    rules: 'string'
                                },
                                {
                                    name: 'city',
                                    label: 'Payer City',
                                    placeholder: 'Enter Payer City',
                                    rules: 'required|string'
                                },
                                {
                                    name: 'state',
                                    label: 'Payer State',
                                    placeholder: 'Enter Payer State',
                                    rules: 'required|string'
                                },
                                {
                                    name: 'zipCode',
                                    label: 'Payer Zip Code',
                                    placeholder: 'Enter Payer Zip Code',
                                    rules: 'required|string'
                                },
                                {
                                    name: 'description',
                                    label: 'Payer Address Description',
                                    placeholder: 'Enter Payer Address Description',
                                    rules: 'string'
                                }
                                ]
                        },
                        {
                            name: 'emailAddress',
                            label: 'Payer Email Address Information',
                            fields:
                                [{
                                    name: 'email',
                                    label: 'Payer Email',
                                    placeholder: 'Enter Payer Email',
                                    rules: 'required|email'
                                },
                                {
                                    name: 'description',
                                    label: 'Payer Email Description',
                                    placeholder: 'Enter Payer Email Description',
                                    rules: 'string'
                                }]
                        },
                        {
                            name: 'phoneNumber',
                            label: 'Payer Phone Number Information',
                            fields:
                                [{
                                    name: 'number',
                                    label: 'Payer Phone Number',
                                    placeholder: 'Enter Payer Phone Number',
                                    rules: 'required|string'
                                },
                                {
                                    name: 'description',
                                    label: 'Payer Phone Number Description',
                                    placeholder: 'Enter Payer Phone Number Description',
                                    rules: 'string'
                                }]
                        }
                        ]
                }
            ]
        };
    }
}
