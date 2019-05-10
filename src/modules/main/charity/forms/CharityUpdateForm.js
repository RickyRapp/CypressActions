import { FormBase } from 'core/components';

export default class CharityUpdateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'CHARITYUPDATEFORM.NAME',
                    rules: 'required|string',
                    disabled: true
                },
                {
                    name: 'taxId',
                    label: 'CHARITYUPDATEFORM.TAXID',
                    rules: 'required|string|digits:9',
                    disabled: true
                },
                {
                    name: 'charityStatusId',
                    label: 'CHARITYUPDATEFORM.CHARITYSTATUSID',
                    rules: 'required|string',
                    disabled: true
                },
                {
                    name: 'charityTypeId',
                    label: 'CHARITYUPDATEFORM.CHARITYTYPEID',
                    rules: 'required|string',
                    disabled: true
                },
                {
                    name: 'dba',
                    label: 'CHARITYUPDATEFORM.DBA',
                    rules: 'string',
                    disabled: true
                },
                {
                    name: 'emailAddress',
                    label: 'CHARITYUPDATEFORM.EMAILADDRESS',
                    fields: [
                        {
                            name: 'email',
                            label: 'CHARITYUPDATEFORM.EMAILADDRESS.EMAIL',
                            rules: 'required|email|string',
                        },
                    ]
                },
                {
                    name: 'contactInformation',
                    label: 'CHARITYUPDATEFORM.CONTACTINFORMATION',
                    fields: [
                        {
                            name: 'firstName',
                            label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.FIRSTNAME',
                            rules: 'required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                        },
                        {
                            name: 'lastName',
                            label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.LASTNAME',
                            rules: 'required_with:contactInformation.firstName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                        },
                        {
                            name: 'address',
                            label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS',
                            fields: [
                                {
                                    name: 'addressLine1',
                                    label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.ADDRESSLINE1',
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                                },
                                {
                                    name: 'addressLine2',
                                    label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.ADDRESSLINE2',
                                    rules: 'string',
                                },
                                {
                                    name: 'city',
                                    label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.CITY',
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                                },
                                {
                                    name: 'state',
                                    label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.STATE',
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                                },
                                {
                                    name: 'zipCode',
                                    label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.ZIPCODE',
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                                },
                            ]
                        },
                        {
                            name: 'emailAddress',
                            label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.EMAILADDRESS',
                            fields: [
                                {
                                    name: 'email',
                                    label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.EMAILADDRESS.EMAIL',
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.phoneNumber.number|string',
                                },
                            ]
                        },
                        {
                            name: 'phoneNumber',
                            label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.PHONENUMBER',
                            fields: [
                                {
                                    name: 'number',
                                    label: 'CHARITYUPDATEFORM.CONTACTINFORMATION.PHONENUMBER.NUMBER',
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|string',
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'bankAccount',
                    label: 'CHARITYUPDATEFORM.BANKACCOUNT',
                    fields: [
                        {
                            name: 'name',
                            label: 'CHARITYUPDATEFORM.BANKACCOUNT.NAME',
                            rules: 'required_with:bankAccount.accountNumber|required_with:bankAccount.routingNumber|required_with:bankAccount.description|string',
                            disabled: true
                        },
                        {
                            name: 'accountNumber',
                            label: 'CHARITYUPDATEFORM.BANKACCOUNT.ACCOUNTNUMBER',
                            rules: 'required_with:bankAccount.name|required_with:bankAccount.routingNumber|required_with:bankAccount.description|string',
                            disabled: true
                        },
                        {
                            name: 'routingNumber',
                            label: 'CHARITYUPDATEFORM.BANKACCOUNT.ROUTINGNUMBER',
                            rules: 'required_with:bankAccount.name|required_with:bankAccount.accountNumber|required_with:bankAccount.description|string|digits:9',
                            disabled: true
                        },
                        {
                            name: 'description',
                            label: 'CHARITYUPDATEFORM.BANKACCOUNT.DESCRIPTION',
                            rules: 'string',
                            disabled: true
                        },
                        {
                            name: 'image',
                            label: 'CHARITYUPDATEFORM.BANKACCOUNT.UPLOADIMAGE',
                            type: 'file',
                            disabled: true
                        }
                    ]
                }
            ]
        }
    };
}

