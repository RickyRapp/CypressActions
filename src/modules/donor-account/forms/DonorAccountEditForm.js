import { FormBase } from 'core/components';

export default class DonorAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'fundName',
                'accountTypeId',
                'coreUser.prefixTypeId',
                'coreUser.firstName',
                'coreUser.middleName',
                'coreUser.lastName',
                'companyProfile',
                'companyProfile.name',
                'companyProfile.dba',
                'companyProfile.website',
                'companyProfile.businessTypeId',
                'companyProfile.address.addressLine1',
                'companyProfile.address.addressLine2',
                'companyProfile.address.city',
                'companyProfile.address.state',
                'companyProfile.address.zipCode',
                'companyProfile.emailAddress.email',
                'companyProfile.emailAddress.description',
                'companyProfile.phoneNumber.number',
                'companyProfile.phoneNumber.description'
            ],

            labels: {
                'fundName': 'Fund Name',
                'accountTypeId': 'Account Type',
                'coreUser.prefixTypeId': 'Prefix Type',
                'coreUser.firstName': 'First Name',
                'coreUser.middleName': 'Middle Name',
                'coreUser.lastName': 'Last Name',
                'companyProfile': 'Company',
                'companyProfile.name': 'Company Name',
                'companyProfile.dba': 'DBA',
                'companyProfile.website': 'Website',
                'companyProfile.businessTypeId': 'Business Type',
                'companyProfile.address.addressLine1': 'Address Line 1',
                'companyProfile.address.addressLine2': 'Address Line 2',
                'companyProfile.address.city': 'City',
                'companyProfile.address.state': 'State',
                'companyProfile.address.zipCode': 'Zip Code',
                'companyProfile.emailAddress.email': 'Email',
                'companyProfile.emailAddress.description': 'Email Description',
                'companyProfile.phoneNumber.number': 'Number',
                'companyProfile.phoneNumber.description': 'Number Description',
            },

            placeholders: {
                'fundName': 'Enter Fund Name',
                'coreUser.prefixTypeId': 'Select Prefix Type',
                'coreUser.firstName': 'Enter First Name',
                'coreUser.middleName': 'Enter Middle Name',
                'coreUser.lastName': 'Enter Last Name',
                'companyProfile.name': 'Enter Company Name',
                'companyProfile.dba': 'Enter DBA',
                'companyProfile.website': 'Enter Website',
                'companyProfile.businessTypeId': 'Select Business Type',
                'companyProfile.address.addressLine1': 'Enter Address Line 1',
                'companyProfile.address.addressLine2': 'Enter Address Line 2',
                'companyProfile.address.city': 'Enter City',
                'companyProfile.address.state': 'Enter State',
                'companyProfile.address.zipCode': 'Enter Zip Code',
                'companyProfile.emailAddress.email': 'Enter Email',
                'companyProfile.emailAddress.description': 'Enter Email Description',
                'companyProfile.phoneNumber.number': 'Enter Number',
                'companyProfile.phoneNumber.description': 'Enter Number Description',
            },

            rules: {
                'fundName': 'required|string',
                'coreUser.prefixTypeId': 'string',
                'coreUser.firstName': 'required|string',
                'coreUser.middleName': 'string',
                'coreUser.lastName': 'required|string',
                'companyProfile.name': 'required_with:companyProfile|string',
                'companyProfile.dba': 'string',
                'companyProfile.website': 'string',
                'companyProfile.businessTypeId': 'required_with:companyProfile|string',
                'companyProfile.address.addressLine1': 'required_with:companyProfile|string',
                'companyProfile.address.addressLine2': 'string',
                'companyProfile.address.city': 'required_with:companyProfile|string',
                'companyProfile.address.state': 'required_with:companyProfile|string',
                'companyProfile.address.zipCode': 'required_with:companyProfile|string',
                'companyProfile.emailAddress.email': 'required_with:companyProfile|string',
                'companyProfile.emailAddress.description': 'string',
                'companyProfile.phoneNumber.number': 'required_with:companyProfile|string',
                'companyProfile.phoneNumber.description': 'string'
            }
        };
    }
};