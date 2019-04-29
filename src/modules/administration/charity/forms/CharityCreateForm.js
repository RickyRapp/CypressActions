import { FormBase } from 'core/components';

export default class CharityCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'charityStatusId',
                    label: 'CHARITYCREATEFORM.CHARITYSTATUSID',
                    rules: 'required|string',
                },
                {
                    name: 'charityTypeId',
                    label: 'CHARITYCREATEFORM.CHARITYTYPEID',
                    rules: 'required|string',
                },
                {
                    name: 'dba',
                    label: 'CHARITYCREATEFORM.DBA',
                    rules: 'string',
                },
                {
                    name: 'name',
                    label: 'CHARITYCREATEFORM.NAME',
                    rules: 'required|string',
                },
                {
                    name: 'taxId',
                    label: 'CHARITYCREATEFORM.TAXID',
                    rules: 'required|string|digits:9',
                },
                {
                    name: 'suggestedById',
                    label: 'CHARITYCREATEFORM.SUGGESTEDBYID',
                    rules: 'string',
                },
                {
                    name: 'hasLogin',
                    label: 'CHARITYCREATEFORM.HASLOGIN',
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'sendWelcomeEmail',
                    label: 'CHARITYCREATEFORM.SENDWELCOMEEMAIL',
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'isApproved',
                    label: 'CHARITYCREATEFORM.ISAPPROVED',
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'coreUser',
                    label: 'CHARITYCREATEFORM.COREUSER',
                    fields: [
                        {
                            name: 'userName',
                            label: 'CHARITYCREATEFORM.COREUSER.USERNAME',
                            rules: 'required_if:hasLogin,true|string',
                        },
                        {
                            name: 'coreMembership',
                            label: 'CHARITYCREATEFORM.COREUSER.COREMEMBERSHIP',
                            fields: [
                                {
                                    name: 'password',
                                    label: 'CHARITYCREATEFORM.COREUSER.COREMEMBERSHIP.PASSWORD',
                                    rules: ['required_if:hasLogin,true', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                                    type: 'password'
                                },
                                {
                                    name: 'confirmPassword',
                                    label: 'CHARITYCREATEFORM.COREUSER.COREMEMBERSHIP.CONFIRMPASSWORD',
                                    rules: 'required_if:hasLogin,true|string|same:coreUser.coreMembership.password',
                                    type: 'password'
                                },

                            ]
                        }
                    ]
                },
                {
                    name: 'address',
                    label: 'CHARITYCREATEFORM.ADDRESS',
                    fields: [
                        {
                            name: 'addressLine1',
                            label: 'CHARITYCREATEFORM.ADDRESS.ADDRESSLINE1',
                            rules: 'required|string',
                        },
                        {
                            name: 'addressLine2',
                            label: 'CHARITYCREATEFORM.ADDRESS.ADDRESSLINE2',
                            rules: 'string',
                        },
                        {
                            name: 'city',
                            label: 'CHARITYCREATEFORM.ADDRESS.CITY',
                            rules: 'required|string',
                        },
                        {
                            name: 'state',
                            label: 'CHARITYCREATEFORM.ADDRESS.STATE',
                            rules: 'required|string',
                        },
                        {
                            name: 'zipCode',
                            label: 'CHARITYCREATEFORM.ADDRESS.ZIPCODE',
                            rules: 'required|string',
                        },
                    ]
                },
                {
                    name: 'emailAddress',
                    label: 'CHARITYCREATEFORM.EMAILADDRESS',
                    fields: [
                        {
                            name: 'email',
                            label: 'CHARITYCREATEFORM.EMAILADDRESS.EMAIL',
                            rules: 'required_if:hasLogin,true|email|string',
                        },
                    ]
                },
                {
                    name: 'hasContact',
                    label: 'CHARITYCREATEFORM.HASCONTACT',
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'contactInformation',
                    label: 'CHARITYCREATEFORM.CONTACTINFORMATION',
                    fields: [
                        {
                            name: 'firstName',
                            label: 'CHARITYCREATEFORM.CONTACTINFORMATION.FIRSTNAME',
                            rules: 'required_if:hasContact,true|string',
                        },
                        {
                            name: 'lastName',
                            label: 'CHARITYCREATEFORM.CONTACTINFORMATION.LASTNAME',
                            rules: 'required_if:hasContact,true|string',
                        },
                        {
                            name: 'address',
                            label: 'CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS',
                            fields: [
                                {
                                    name: 'addressLine1',
                                    label: 'CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.ADDRESSLINE1',
                                    rules: 'required_if:hasContact,true|string',
                                },
                                {
                                    name: 'addressLine2',
                                    label: 'CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.ADDRESSLINE2',
                                    rules: 'string',
                                },
                                {
                                    name: 'city',
                                    label: 'CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.CITY',
                                    rules: 'required_if:hasContact,true|string',
                                },
                                {
                                    name: 'state',
                                    label: 'CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.STATE',
                                    rules: 'required_if:hasContact,true|string',
                                },
                                {
                                    name: 'zipCode',
                                    label: 'CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.ZIPCODE',
                                    rules: 'required_if:hasContact,true|string',
                                },
                            ]
                        },
                        {
                            name: 'emailAddress',
                            label: 'CHARITYCREATEFORM.CONTACTINFORMATION.EMAILADDRESS',
                            fields: [
                                {
                                    name: 'email',
                                    label: 'CHARITYCREATEFORM.CONTACTINFORMATION.EMAILADDRESS.EMAIL',
                                    rules: 'required_if:hasContact,true|string',
                                },
                            ]
                        },
                        {
                            name: 'phoneNumber',
                            label: 'CHARITYCREATEFORM.CONTACTINFORMATION.PHONENUMBER',
                            fields: [
                                {
                                    name: 'number',
                                    label: 'CHARITYCREATEFORM.CONTACTINFORMATION.PHONENUMBER.NUMBER',
                                    rules: 'required_if:hasContact,true|string',
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'hasBankAccount',
                    label: 'CHARITYCREATEFORM.HASBANKACCOUNT',
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'bankAccount',
                    label: 'CHARITYCREATEFORM.CONTACTINFORMATION.BANKACCOUNT',
                    fields: [
                        {
                            name: 'name',
                            label: 'CHARITYCREATEFORM.BANKACCOUNT.NAME',
                            rules: 'required_if:hasBankAccount,true|string'
                        },
                        {
                            name: 'accountNumber',
                            label: 'CHARITYCREATEFORM.BANKACCOUNT.ACCOUNTNUMBER',
                            rules: 'required_if:hasBankAccount,true|string'
                        },
                        {
                            name: 'routingNumber',
                            label: 'CHARITYCREATEFORM.BANKACCOUNT.ROUTINGNUMBER',
                            rules: 'required_if:hasBankAccount,true|string|digits:9'
                        },
                        {
                            name: 'description',
                            label: 'CHARITYCREATEFORM.BANKACCOUNT.DESCRIPTION',
                            rules: 'string'
                        }
                    ]
                }
            ]
        }
    }
};