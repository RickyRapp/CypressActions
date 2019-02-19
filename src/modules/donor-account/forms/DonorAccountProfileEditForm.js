import { FormBase } from 'core/components';

export default class DonorAccountProfileEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'fundName',
                'blankBookletMax',
                'notificationLimitRemainderAmount',
                'deliveryMethodType',
                'coreUser.firstName',
                'coreUser.lastName',
                'coreUser.middleName',
                'coreUser.prefixType',
                'donorAccountAddresses',
                'donorAccountAddresses[].id',
                'donorAccountAddresses[].primary',
                'donorAccountAddresses[].address',
                'donorAccountAddresses[].address.id',
                'donorAccountAddresses[].address.addressLine1',
                'donorAccountAddresses[].address.addressLine2',
                'donorAccountAddresses[].address.city',
                'donorAccountAddresses[].address.state',
                'donorAccountAddresses[].address.zipCode',
                'donorAccountAddresses[].address.description',
                'donorAccountEmailAddresses',
                'donorAccountEmailAddresses[].id',
                'donorAccountEmailAddresses[].primary',
                'donorAccountEmailAddresses[].emailAddress',
                'donorAccountEmailAddresses[].emailAddress.id',
                'donorAccountEmailAddresses[].emailAddress.email',
                'donorAccountEmailAddresses[].emailAddress.description',
                'donorAccountPhoneNumbers',
                'donorAccountPhoneNumbers[].id',
                'donorAccountPhoneNumbers[].primary',
                'donorAccountPhoneNumbers[].phoneNumber',
                'donorAccountPhoneNumbers[].phoneNumber.id',
                'donorAccountPhoneNumbers[].phoneNumber.number',
                'donorAccountPhoneNumbers[].phoneNumber.description'
            ],

            labels: {
                'fundName': 'Fund Name',
                'blankBookletMax': 'Set maximum for hand written certificates',
                'notificationLimitRemainderAmount': 'Low balance alert',
                'deliveryMethodType': 'How would you like to get the following reports',
                'coreUser.firstName': 'First Name',
                'coreUser.lastName': 'Last Name',
                'coreUser.middleName': 'Middle Name',
                'coreUser.prefixType': 'Prefix Types',
                'donorAccountAddresses': 'Addresses',
                'donorAccountAddresses[].primary': 'Primary',
                'donorAccountAddresses[].address': 'Address',
                'donorAccountAddresses[].address.addressLine1': 'Address Line 1',
                'donorAccountAddresses[].address.addressLine2': 'Address Line 2',
                'donorAccountAddresses[].address.city': 'City',
                'donorAccountAddresses[].address.state': 'State',
                'donorAccountAddresses[].address.zipCode': 'Zip Code',
                'donorAccountAddresses[].address.description': 'Description',
                'donorAccountEmailAddresses': 'Email Addresses',
                'donorAccountEmailAddresses[].primary': 'Primary',
                'donorAccountEmailAddresses[].emailAddress': 'Email Address',
                'donorAccountEmailAddresses[].emailAddress.email': 'Email',
                'donorAccountEmailAddresses[].emailAddress.description': 'Description',
                'donorAccountPhoneNumbers': 'Phone Number',
                'donorAccountPhoneNumbers[].primary': 'Primary',
                'donorAccountPhoneNumbers[].phoneNumber': 'Phone Number',
                'donorAccountPhoneNumbers[].phoneNumber.number': 'Number',
                'donorAccountPhoneNumbers[].phoneNumber.description': 'Description'
            },

            placeholders: {
                'fundName': 'Fund Name',
                'blankBookletMax': 'Set maximum for hand written certificates',
                'notificationLimitRemainderAmount': 'Low balance alert',
                'deliveryMethodType': 'How would you like to get the following reports',
                'coreUser.firstName': 'Enter First Name',
                'coreUser.lastName': 'Enter Last Name',
                'coreUser.middleName': 'Enter Middle Name',
                'coreUser.prefixType': 'Choose Prefix Types',
                'donorAccountAddresses[].primary': 'Select Primary Address',
                'donorAccountAddresses[].address.addressLine1': 'Enter Address Line 1',
                'donorAccountAddresses[].address.addressLine2': 'Enter Address Line 2',
                'donorAccountAddresses[].address.city': 'Enter City',
                'donorAccountAddresses[].address.state': 'Enter State',
                'donorAccountAddresses[].address.zipCode': 'Enter Zip Code',
                'donorAccountAddresses[].address.description': 'Enter address description',
                'donorAccountEmailAddresses[].primary': 'Select Primary Email Address',
                'donorAccountEmailAddresses[].emailAddress': 'Enter Email Address',
                'donorAccountEmailAddresses[].emailAddress.email': 'Enter Email',
                'donorAccountEmailAddresses[].emailAddress.description': 'Enter Description',
                'donorAccountPhoneNumbers[].primary': 'Select Primary Phone Number',
                'donorAccountPhoneNumbers[].phoneNumber': 'Enter Phone Number',
                'donorAccountPhoneNumbers[].phoneNumber.number': 'Enter Number',
                'donorAccountPhoneNumbers[].phoneNumber.description': 'Enter Description'
            },

            rules: {
                'fundName': 'required|string',
                'blankBookletMax': 'required|numeric|min:0',
                'notificationLimitRemainderAmount': 'numeric|min:0',
                'coreUser.firstName': 'required|string',
                'coreUser.middleName': 'string',
                'coreUser.lastName': 'required|string',
                'donorAccountAddresses[].primary': 'boolean',
                'donorAccountAddresses[].address.addressLine1': 'required|string',
                'donorAccountAddresses[].address.addressLine2': 'string',
                'donorAccountAddresses[].address.city': 'required|string',
                'donorAccountAddresses[].address.state': 'required|string',
                'donorAccountAddresses[].address.zipCode': 'required|string',
                'donorAccountAddresses[].address.description': 'string',
                'donorAccountEmailAddresses[].primary': 'boolean',
                'donorAccountEmailAddresses[].emailAddress.email': 'required|email',
                'donorAccountEmailAddresses[].emailAddress.description': 'string',
                'donorAccountPhoneNumbers[].phoneNumber.number': 'required|string',
                'donorAccountPhoneNumbers[].phoneNumber.description': 'string'
            }
        };
    }
};