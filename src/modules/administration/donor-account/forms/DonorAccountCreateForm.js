import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class DonorAccountCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isCompany',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.ISCOMPANY'),
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'accountTypeId',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.ACCOUNTTYPEID'),
                    rules: 'required|string',
                },
                {
                    name: 'fundName',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.FUNDNAME'),
                    rules: 'required|string',
                },
                {
                    name: 'activationUrl',
                    rules: 'required|string',
                },
                {
                    name: 'securityPin',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.SECURITYPIN'),
                    rules: 'required|numeric|digits:4',
                    options: {
                        validateOnChange: true
                    }
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.DELIVERYMETHODTYPEID'),
                    rules: 'required|string',
                },
                {
                    name: 'sendWelcomeEmail',
                    label: localizationService.t('SENDWELCOMEEMAIL'),
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'isApproved',
                    label: localizationService.t('ISAPPROVED'),
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'coreUser',
                    fields: [
                        {
                            name: 'prefixTypeId',
                            label: localizationService.t('DONORACCOUNTCREATEFORM.COREUSER.PREFIXTYPEID'),
                            rules: 'string',
                        },
                        {
                            name: 'firstName',
                            label: localizationService.t('FIRSTNAME'),
                            rules: 'required_if:isCompany,false|string',
                        },
                        {
                            name: 'middleName',
                            label: localizationService.t('MIDDLENAME'),
                            rules: 'string',
                        },
                        {
                            name: 'lastName',
                            label: localizationService.t('LASTNAME'),
                            rules: 'required_if:isCompany,false|string',
                        },
                        {
                            name: 'userName',
                            label: localizationService.t('USERNAME'),
                            rules: 'required|string',
                        },
                        {
                            name: 'coreMembership',
                            fields: [
                                {
                                    name: 'password',
                                    label: localizationService.t('PASSWORD'),
                                    rules: 'required|string',
                                },
                                {
                                    name: 'confirmPassword',
                                    label: localizationService.t('CONFIRMPASSWORD'),
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
                            label: localizationService.t('COMPANYPROFILE.NAME'),
                            rules: 'required_if:isCompany,true|string',
                        },
                        {
                            name: 'dba',
                            label: localizationService.t('COMPANYPROFILE.DBA'),
                            rules: 'string',
                        },
                        {
                            name: 'website',
                            label: localizationService.t('COMPANYPROFILE.WEBSITE'),
                            rules: 'string',
                        },
                        {
                            name: 'businessTypeId',
                            label: localizationService.t('COMPANYPROFILE.BUSINESSTYPEID'),
                            rules: 'required_if:isCompany,true|string',
                        },
                        {
                            name: 'hasCompanyContact',
                            label: localizationService.t('COMPANYPROFILE.HASCOMPANYCONTACT'),
                            rules: 'boolean',
                            type: 'checkbox'
                        },
                        {
                            name: 'contactPerson',
                            fields: [
                                {
                                    name: 'name',
                                    label: localizationService.t('NAME'),
                                    rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                },
                                {
                                    name: 'address',
                                    fields: [
                                        {
                                            name: 'addressLine1',
                                            label: localizationService.t('ADDRESS.ADDRESSLINE1'),
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                        },
                                        {
                                            name: 'addressLine2',
                                            label: localizationService.t('ADDRESS.ADDRESSLINE2'),
                                            rules: 'string',
                                        },
                                        {
                                            name: 'city',
                                            label: localizationService.t('ADDRESS.CITY'),
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                        },
                                        {
                                            name: 'state',
                                            label: localizationService.t('ADDRESS.STATE'),
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                        },
                                        {
                                            name: 'zipCode',
                                            label: localizationService.t('ADDRESS.ZIPCODE'),
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|string',
                                        },
                                    ]
                                },
                                {
                                    name: 'emailAddress',
                                    fields: [
                                        {
                                            name: 'email',
                                            label: localizationService.t('EMAILADDRESS.EMAIL'),
                                            rules: 'required_if:companyProfile.hasCompanyContact,true|email|string',
                                        },
                                    ]
                                },
                                {
                                    name: 'phoneNumber',
                                    fields: [
                                        {
                                            name: 'number',
                                            label: localizationService.t('PHONENUMBER.NUMBER'),
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
                            label: localizationService.t('ADDRESS.ADDRESSLINE1'),
                            rules: 'required|string',
                        },
                        {
                            name: 'addressLine2',
                            label: localizationService.t('ADDRESS.ADDRESSLINE2'),
                            rules: 'string',
                        },
                        {
                            name: 'city',
                            label: localizationService.t('ADDRESS.CITY'),
                            rules: 'required|string',
                        },
                        {
                            name: 'state',
                            label: localizationService.t('ADDRESS.STATE'),
                            rules: 'required|string',
                        },
                        {
                            name: 'zipCode',
                            label: localizationService.t('ADDRESS.ZIPCODE'),
                            rules: 'required|string',
                        },
                    ]
                },
                {
                    name: 'emailAddress',
                    fields: [
                        {
                            name: 'email',
                            label: localizationService.t('EMAILADDRESS.EMAIL'),
                            rules: 'required|email',
                        },
                    ]
                },
                {
                    name: 'phoneNumber',
                    fields: [
                        {
                            name: 'number',
                            label: localizationService.t('PHONENUMBER.NUMBER'),
                            rules: 'required|numeric',
                            options: {
                                validateOnChange: true
                            }
                        },
                    ]
                },
                {
                    name: 'initialContribution',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.INITIALCONTRIBUTION'),
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'contributionMinimumInitial',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.CONTRIBUTIONMINIMUMINITIAL'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'contributionMinimumAdditional',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.CONTRIBUTIONMINIMUMADDITIONAL'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'grantMinimumAmount',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.GRANTMINIMUMAMOUNT'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'grantFee',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.GRANTFEE'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'certificateDeduction',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.CERTIFICATEDEDUCTION'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'certificateFee',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.CERTIFICATEFEE'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'lineOfCredit',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.LINEOFCREDIT'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'extraBookletPercentage',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.EXTRABOOKLETPERCENTAGE'),
                    rules: 'numeric|min:0',
                },
                {
                    name: 'blankBookletMax',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.BLANKBOOKLETMAX'),
                    rules: 'numeric|min:0',
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: localizationService.t('DONORACCOUNTCREATEFORM.NOTIFICATIONLIMITREMAINDERAMOUNT'),
                    rules: 'numeric',
                },
            ]
        };
    }
};