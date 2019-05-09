import { FormBase } from 'core/components';

export default class DonorAccountCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isCompany',
                    label: 'DONORACCOUNTCREATEFORM.ISCOMPANY',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'accountTypeId',
                    label: 'DONORACCOUNTCREATEFORM.ACCOUNTTYPEID',
                    rules: 'required|string',
                },
                {
                    name: 'fundName',
                    label: 'DONORACCOUNTCREATEFORM.FUNDNAME',
                    rules: 'required|string',
                },
                {
                    name: 'activationUrl',
                    rules: 'required|string',
                },
                {
                    name: 'securityPin',
                    label: 'DONORACCOUNTCREATEFORM.SECURITYPIN',
                    rules: 'required|numeric|digits:4',
                    options: {
                        validateOnChange: true
                    }
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: 'DONORACCOUNTCREATEFORM.DELIVERYMETHODTYPEID',
                    rules: 'required|string',
                },
                {
                    name: 'sendWelcomeEmail',
                    label: 'SENDWELCOMEEMAIL',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isApproved',
                    label: 'ISAPPROVED',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'coreUser',
                    fields: [
                        {
                            name: 'prefixTypeId',
                            label: 'DONORACCOUNTCREATEFORM.COREUSER.PREFIXTYPEID',
                            rules: 'string',
                        },
                        {
                            name: 'firstName',
                            label: 'FIRSTNAME',
                            rules: 'required_if:isCompany,false|string',
                        },
                        {
                            name: 'middleName',
                            label: 'MIDDLENAME',
                            rules: 'string',
                        },
                        {
                            name: 'lastName',
                            label: 'LASTNAME',
                            rules: 'required_if:isCompany,false|string',
                        },
                        {
                            name: 'userName',
                            label: 'USERNAME',
                            rules: 'required|string',
                        },
                        {
                            name: 'coreMembership',
                            fields: [
                                {
                                    name: 'password',
                                    label: 'PASSWORD',
                                    rules: 'required|string',
                                },
                                {
                                    name: 'confirmPassword',
                                    label: 'CONFIRMPASSWORD',
                                    rules: 'required|string|same:coreUser.coreMembership.password',
                                },
                            ]
                        }
                    ]
                },
                {
                    name: 'companyProfile',
                    fields: [
                        {
                            name: 'name',
                            label: 'COMPANYPROFILE.NAME',
                            rules: 'required_if:isCompany,true|string',
                        },
                        {
                            name: 'dba',
                            label: 'COMPANYPROFILE.DBA',
                            rules: 'string',
                        },
                        {
                            name: 'website',
                            label: 'COMPANYPROFILE.WEBSITE',
                            rules: 'string',
                        },
                        {
                            name: 'businessTypeId',
                            label: 'COMPANYPROFILE.BUSINESSTYPEID',
                            rules: 'required_if:isCompany,true|string',
                        },
                        {
                            name: 'hasCompanyContact',
                            label: 'COMPANYPROFILE.HASCOMPANYCONTACT',
                            rules: 'boolean',
                            type: 'checkbox'
                        },
                        {
                            name: 'contactPerson',
                            fields: [
                                {
                                    name: 'firstName',
                                    label: 'FIRSTNAME',
                                    rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                },
                                {
                                    name: 'lastName',
                                    label: 'LASTNAME',
                                    rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                },
                                {
                                    name: 'address',
                                    fields: [
                                        {
                                            name: 'addressLine1',
                                            label: 'ADDRESS.ADDRESSLINE1',
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                        },
                                        {
                                            name: 'addressLine2',
                                            label: 'ADDRESS.ADDRESSLINE2',
                                            rules: 'string',
                                        },
                                        {
                                            name: 'city',
                                            label: 'ADDRESS.CITY',
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                        },
                                        {
                                            name: 'state',
                                            label: 'ADDRESS.STATE',
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                        },
                                        {
                                            name: 'zipCode',
                                            label: 'ADDRESS.ZIPCODE',
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                        },
                                    ]
                                },
                                {
                                    name: 'emailAddress',
                                    fields: [
                                        {
                                            name: 'email',
                                            label: 'EMAILADDRESS.EMAIL',
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|email|string',
                                        },
                                    ]
                                },
                                {
                                    name: 'phoneNumber',
                                    fields: [
                                        {
                                            name: 'number',
                                            label: 'PHONENUMBER.NUMBER',
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|numeric',
                                            options: {
                                                validateOnChange: true
                                            }
                                        },
                                    ]
                                }
                            ]
                        },
                    ]
                },
                {
                    name: 'address',
                    fields: [
                        {
                            name: 'addressLine1',
                            label: 'ADDRESS.ADDRESSLINE1',
                            rules: 'required|string',
                        },
                        {
                            name: 'addressLine2',
                            label: 'ADDRESS.ADDRESSLINE2',
                            rules: 'string',
                        },
                        {
                            name: 'city',
                            label: 'ADDRESS.CITY',
                            rules: 'required|string',
                        },
                        {
                            name: 'state',
                            label: 'ADDRESS.STATE',
                            rules: 'required|string',
                        },
                        {
                            name: 'zipCode',
                            label: 'ADDRESS.ZIPCODE',
                            rules: 'required|string',
                        },
                    ]
                },
                {
                    name: 'emailAddress',
                    fields: [
                        {
                            name: 'email',
                            label: 'EMAILADDRESS.EMAIL',
                            rules: 'required|email',
                        },
                    ]
                },
                {
                    name: 'phoneNumber',
                    fields: [
                        {
                            name: 'number',
                            label: 'PHONENUMBER.NUMBER',
                            rules: 'required|numeric',
                            options: {
                                validateOnChange: true
                            }
                        },
                    ]
                },
                {
                    name: 'initialContribution',
                    label: 'DONORACCOUNTCREATEFORM.INITIALCONTRIBUTION',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'contributionMinimumInitial',
                    label: 'DONORACCOUNTCREATEFORM.CONTRIBUTIONMINIMUMINITIAL',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'contributionMinimumAdditional',
                    label: 'DONORACCOUNTCREATEFORM.CONTRIBUTIONMINIMUMADDITIONAL',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'grantMinimumAmount',
                    label: 'DONORACCOUNTCREATEFORM.GRANTMINIMUMAMOUNT',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'grantFee',
                    label: 'DONORACCOUNTCREATEFORM.GRANTFEE',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'certificateDeduction',
                    label: 'DONORACCOUNTCREATEFORM.CERTIFICATEDEDUCTION',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'certificateFee',
                    label: 'DONORACCOUNTCREATEFORM.CERTIFICATEFEE',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'lineOfCredit',
                    label: 'DONORACCOUNTCREATEFORM.LINEOFCREDIT',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'extraBookletPercentage',
                    label: 'DONORACCOUNTCREATEFORM.EXTRABOOKLETPERCENTAGE',
                    rules: 'numeric|min:0',
                },
                {
                    name: 'blankBookletMax',
                    label: 'DONORACCOUNTCREATEFORM.BLANKBOOKLETMAX',
                    rules: 'numeric|min:0',
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'DONORACCOUNTCREATEFORM.NOTIFICATIONLIMITREMAINDERAMOUNT',
                    rules: 'numeric',
                },
            ]
        };
    }
};