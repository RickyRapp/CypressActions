import { FormBase } from 'core/components';

export default class DonorAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isCompany',
                    label: 'COMPANYPROFILE.ISCOMPANY',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'companyProfileId',
                    rules: 'string',
                },
                {
                    name: 'accountTypeId',
                    label: 'DONORACCOUNTEDITFORM.ACCOUNTTYPEID',
                    rules: 'required|string',
                },
                {
                    name: 'fundName',
                    label: 'DONORACCOUNTEDITFORM.FUNDNAME',
                    rules: 'required|string',
                },
                {
                    name: 'securityPin',
                    label: 'DONORACCOUNTEDITFORM.SECURITYPIN',
                    rules: 'required|numeric|digits:4',
                    options: {
                        validateOnChange: true
                    }
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: 'DONORACCOUNTEDITFORM.DELIVERYMETHODTYPEID',
                    rules: 'required|string',
                },
                {
                    name: 'coreUser',
                    fields: [
                        {
                            name: 'prefixTypeId',
                            label: 'COREUSER.PREFIXTYPEID',
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
                    name: 'initialContribution',
                    label: 'DONORACCOUNTEDITFORM.INITIALCONTRIBUTION',
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'contributionMinimumInitial',
                    label: 'DONORACCOUNTEDITFORM.CONTRIBUTIONMINIMUMINITIAL',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'contributionMinimumAdditional',
                    label: 'DONORACCOUNTEDITFORM.CONTRIBUTIONMINIMUMADDITIONAL',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'grantMinimumAmount',
                    label: 'DONORACCOUNTEDITFORM.GRANTMINIMUMAMOUNT',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'grantFee',
                    label: 'DONORACCOUNTEDITFORM.GRANTFEE',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'certificateDeduction',
                    label: 'DONORACCOUNTEDITFORM.CERTIFICATEDEDUCTION',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'certificateFee',
                    label: 'DONORACCOUNTEDITFORM.CERTIFICATEFEE',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'lineOfCredit',
                    label: 'DONORACCOUNTEDITFORM.LINEOFCREDIT',
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'extraBookletPercentage',
                    label: 'DONORACCOUNTEDITFORM.EXTRABOOKLETPERCENTAGE',
                    rules: 'numeric|min:0',
                },
                {
                    name: 'blankBookletMax',
                    label: 'DONORACCOUNTEDITFORM.BLANKBOOKLETMAX',
                    rules: 'numeric|min:0',
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'DONORACCOUNTEDITFORM.NOTIFICATIONLIMITREMAINDERAMOUNT',
                    rules: 'numeric',
                },
            ]
        };
    }
};