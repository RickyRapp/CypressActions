import { FormBase } from 'core/components';

export default class ContributionCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'amount',
                'description',
                'paymentTypeId',
                'bankAccountId',
                'checkNumber',
                'payerInformation',
                'payerInformation.firstName',
                'payerInformation.lastName',
                'payerInformation.address',
                'payerInformation.address.addressLine1',
                'payerInformation.address.addressLine2',
                'payerInformation.address.city',
                'payerInformation.address.state',
                'payerInformation.address.zipCode',
                'payerInformation.emailAddress',
                'payerInformation.emailAddress.email',
                'payerInformation.phoneNumber',
                'payerInformation.phoneNumber.number',
            ],

            labels: {
                'amount': 'Amount',
                'description': 'Description',
                'paymentTypeId': 'Payment Type',
                'bankAccountId': 'Bank Account',
                'checkNumber': 'Check Number',
                'payerInformation': 'Payer Information',
                'payerInformation.firstName': 'Payer First Name',
                'payerInformation.lastName': 'Payer Last Name',
                'payerInformation.address': 'Payer Address',
                'payerInformation.address.addressLine1': 'Payer Address Line 1',
                'payerInformation.address.addressLine2': 'Payer Address Line 2',
                'payerInformation.address.city': 'Payer City',
                'payerInformation.address.state': 'Payer State',
                'payerInformation.address.zipCode': 'Payer Zip Code',
                'payerInformation.emailAddress': 'Payer Email Address',
                'payerInformation.emailAddress.email': 'Payer Email',
                'payerInformation.phoneNumber': 'Payer Phone Number',
                'payerInformation.phoneNumber.number': 'Payer Number',
            },

            placeholders: {
                'amount': 'Enter Amount',
                'description': 'Enter Description',
                'paymentTypeId': 'Choose Payment Type',
                'bankAccountId': 'Choose Bank Account',
                'checkNumber': 'Enter Check Number',
                'payerInformation.firstName': 'Enter Payer First Name',
                'payerInformation.lastName': 'Enter Payer Last Name',
                'payerInformation.address.addressLine1': 'Enter Payer Address Line 1',
                'payerInformation.address.addressLine2': 'Enter Payer Address Line 2',
                'payerInformation.address.city': 'Enter Payer City',
                'payerInformation.address.state': 'Enter Payer State',
                'payerInformation.address.zipCode': 'Enter Payer Zip Code',
                'payerInformation.emailAddress.email': 'Enter Payer Email',
                'payerInformation.phoneNumber.number': 'Enter Payer Number',
            },

            rules: {
                'amount': 'required|numeric|min:0',
                'description': 'string',
                'paymentTypeId': 'required|string',
                'bankAccountId': 'string',
                'checkNumber': 'string',
                'payerInformation.firstName': 'required|string',
                'payerInformation.lastName': 'required|string',
                'payerInformation.address.addressLine1': 'required|string',
                'payerInformation.address.addressLine2': 'string',
                'payerInformation.address.city': 'required|string',
                'payerInformation.address.state': 'required|string',
                'payerInformation.address.zipCode': 'required|string',
                'payerInformation.emailAddress.email': 'required|string',
                'payerInformation.phoneNumber.number': 'required|string',
            }
        };
    }
};