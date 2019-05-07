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
                'thirdPartyAccountHolder',
                'thirdPartyAccountHolder.id',
                'thirdPartyAccountHolder.firstName',
                'thirdPartyAccountHolder.lastName',
                'thirdPartyAccountHolder.middleName',
                'thirdPartyAccountHolder.address',
                'thirdPartyAccountHolder.address.id',
                'thirdPartyAccountHolder.address.addressLine1',
                'thirdPartyAccountHolder.address.addressLine2',
                'thirdPartyAccountHolder.address.city',
                'thirdPartyAccountHolder.address.state',
                'thirdPartyAccountHolder.address.zipCode',
                'thirdPartyAccountHolder.emailAddress',
                'thirdPartyAccountHolder.emailAddress.id',
                'thirdPartyAccountHolder.emailAddress.email',
                'thirdPartyAccountHolder.phoneNumber',
                'thirdPartyAccountHolder.phoneNumber.id',
                'thirdPartyAccountHolder.phoneNumber.number',
            ],

            labels: {
                'bankAccount': 'Bank Account',
                'name': 'Name',
                'accountNumber': 'Account Number',
                'routingNumber': 'Routing Number',
                'description': 'Description',
                'thirdPartyAccountHolder': 'Account Holder',
                'thirdPartyAccountHolder.firstName': 'First Name',
                'thirdPartyAccountHolder.lastName': 'Last Name',
                'thirdPartyAccountHolder.middleName': 'Middle Name',
                'thirdPartyAccountHolder.address': 'Address',
                'thirdPartyAccountHolder.address.addressLine1': 'Address Line 1',
                'thirdPartyAccountHolder.address.addressLine2': 'Address Line 2',
                'thirdPartyAccountHolder.address.city': 'City',
                'thirdPartyAccountHolder.address.state': 'State',
                'thirdPartyAccountHolder.address.zipCode': 'Zip Code',
                'thirdPartyAccountHolder.emailAddress': 'Email Address',
                'thirdPartyAccountHolder.emailAddress.email': 'Email',
                'thirdPartyAccountHolder.phoneNumber': 'Phone Number',
                'thirdPartyAccountHolder.phoneNumber.number': 'Number',
            },

            placeholders: {
                'bankAccount': 'Bank Account',
                'name': 'Enter Name',
                'accountNumber': 'Enter Account Number',
                'routingNumber': 'Enter Routing Number',
                'description': 'Enter bankAccount description',
                'thirdPartyAccountHolder': 'Account Holder',
                'thirdPartyAccountHolder.firstName': 'Enter First Name',
                'thirdPartyAccountHolder.lastName': 'Enter Last Name',
                'thirdPartyAccountHolder.middleName': 'Enter Middle Name',
                'thirdPartyAccountHolder.address': 'Address',
                'thirdPartyAccountHolder.address': 'Address',
                'thirdPartyAccountHolder.address.addressLine1': 'Enter Address Line 1',
                'thirdPartyAccountHolder.address.addressLine2': 'Enter Address Line 2',
                'thirdPartyAccountHolder.address.city': 'Enter City',
                'thirdPartyAccountHolder.address.state': 'Enter State',
                'thirdPartyAccountHolder.address.zipCode': 'Enter Zip Code',
                'thirdPartyAccountHolder.emailAddress': 'Email Address',
                'thirdPartyAccountHolder.emailAddress.email': 'Enter Email',
                'thirdPartyAccountHolder.phoneNumber': 'Phone Number',
                'thirdPartyAccountHolder.phoneNumber.number': 'Enter Number',
            },

            rules: {
                'name': 'required|string',
                'accountNumber': 'required|string',
                'routingNumber': 'required|string|digits:9',
                'description': 'string',
                'thirdPartyAccountHolder.firstName': 'string',
                'thirdPartyAccountHolder.lastName': 'string',
                'thirdPartyAccountHolder.middleName': 'string',
                'thirdPartyAccountHolder.address.addressLine1': 'string',
                'thirdPartyAccountHolder.address.addressLine2': 'string',
                'thirdPartyAccountHolder.address.city': 'string',
                'thirdPartyAccountHolder.address.state': 'string',
                'thirdPartyAccountHolder.address.zipCode': 'string',
                'thirdPartyAccountHolder.emailAddress.email': 'email',
                'thirdPartyAccountHolder.phoneNumber.number': 'string',
            },

            disabled: {
                accountNumber: true
            }
        };
    }
};