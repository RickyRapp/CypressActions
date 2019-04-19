import { FormBase } from 'core/components';

export default class DonorAccountBankAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'id',
                'name',
                'accountNumber',
                'routingNumber',
                'description',
                'accountHolder',
                'accountHolder.id',
                'accountHolder.firstName',
                'accountHolder.lastName',
                'accountHolder.middleName',
                'accountHolder.address',
                'accountHolder.address.id',
                'accountHolder.address.addressLine1',
                'accountHolder.address.addressLine2',
                'accountHolder.address.city',
                'accountHolder.address.state',
                'accountHolder.address.zipCode',
                'accountHolder.emailAddress',
                'accountHolder.emailAddress.id',
                'accountHolder.emailAddress.email',
                'accountHolder.phoneNumber',
                'accountHolder.phoneNumber.id',
                'accountHolder.phoneNumber.number',
            ],

            labels: {
                'bankAccount': 'Bank Account',
                'name': 'Name',
                'accountNumber': 'Account Number',
                'routingNumber': 'Routing Number',
                'description': 'Description',
                'accountHolder': 'Account Holder',
                'accountHolder.firstName': 'First Name',
                'accountHolder.lastName': 'Last Name',
                'accountHolder.middleName': 'Middle Name',
                'accountHolder.address': 'Address',
                'accountHolder.address.addressLine1': 'Address Line 1',
                'accountHolder.address.addressLine2': 'Address Line 2',
                'accountHolder.address.city': 'City',
                'accountHolder.address.state': 'State',
                'accountHolder.address.zipCode': 'Zip Code',
                'accountHolder.emailAddress': 'Email Address',
                'accountHolder.emailAddress.email': 'Email',
                'accountHolder.phoneNumber': 'Phone Number',
                'accountHolder.phoneNumber.number': 'Number',
            },

            placeholders: {
                'bankAccount': 'Bank Account',
                'name': 'Enter Name',
                'accountNumber': 'Enter Account Number',
                'routingNumber': 'Enter Routing Number',
                'description': 'Enter bankAccount description',
                'accountHolder': 'Account Holder',
                'accountHolder.firstName': 'Enter First Name',
                'accountHolder.lastName': 'Enter Last Name',
                'accountHolder.middleName': 'Enter Middle Name',
                'accountHolder.address': 'Address',
                'accountHolder.address': 'Address',
                'accountHolder.address.addressLine1': 'Enter Address Line 1',
                'accountHolder.address.addressLine2': 'Enter Address Line 2',
                'accountHolder.address.city': 'Enter City',
                'accountHolder.address.state': 'Enter State',
                'accountHolder.address.zipCode': 'Enter Zip Code',
                'accountHolder.emailAddress': 'Email Address',
                'accountHolder.emailAddress.email': 'Enter Email',
                'accountHolder.phoneNumber': 'Phone Number',
                'accountHolder.phoneNumber.number': 'Enter Number',
            },

            rules: {
                'name': 'required|string',
                'accountNumber': 'required|string',
                'routingNumber': 'required|string|digits:9',
                'description': 'string',
                'accountHolder.firstName': 'string',
                'accountHolder.lastName': 'string',
                'accountHolder.middleName': 'string',
                'accountHolder.address.addressLine1': 'string',
                'accountHolder.address.addressLine2': 'string',
                'accountHolder.address.city': 'string',
                'accountHolder.address.state': 'string',
                'accountHolder.address.zipCode': 'string',
                'accountHolder.emailAddress.email': 'email',
                'accountHolder.phoneNumber.number': 'string',
            },

            disabled: {
                accountNumber: true
            }
        };
    }
};