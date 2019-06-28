import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class DonorAccountEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'isCompany',
                    label: localizationService.t('COMPANYPROFILE.ISCOMPANY'),
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'companyProfileId',
                    rules: 'string',
                },
                {
                    name: 'accountTypeId',
                    label: localizationService.t('DONORACCOUNTEDITFORM.ACCOUNTTYPEID'),
                    rules: 'required|string',
                },
                {
                    name: 'fundName',
                    label: localizationService.t('DONORACCOUNTEDITFORM.FUNDNAME'),
                    rules: 'required|string',
                },
                {
                    name: 'securityPin',
                    label: localizationService.t('DONORACCOUNTEDITFORM.SECURITYPIN'),
                    rules: 'required|numeric|digits:4',
                    options: {
                        validateOnChange: true
                    }
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: localizationService.t('DONORACCOUNTEDITFORM.DELIVERYMETHODTYPEID'),
                    rules: 'required|string',
                },
                {
                    name: 'coreUser',
                    fields: [
                        {
                            name: 'prefixTypeId',
                            label: localizationService.t('COREUSER.PREFIXTYPEID'),
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
                    ]
                },
                {
                    name: 'companyProfile',
                    fields: [
                        {
                            name: 'name',
                            label: localizationService.t('COMPANYPROFILE.NAME'),
                            rules: 'required_with:companyProfileId|string',
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
                            rules: 'required_with:companyProfileId|string',
                        },
                        {
                            name: 'contactPerson',
                            fields: [
                                {
                                    name: 'firstName',
                                    label: localizationService.t('FIRSTNAME'),
                                    rules: 'required_with:companyProfile.contactPerson.lastName|required_with:companyProfile.contactPerson.address.addressLine1|required_with:companyProfile.contactPerson.address.addressLine2|required_with:companyProfile.contactPerson.address.city|required_with:companyProfile.contactPerson.address.state|required_with:companyProfile.contactPerson.address.zipCode|required_with:companyProfile.contactPerson.emailAddress.email|required_with:companyProfile.contactPerson.phoneNumber.number|string'
                                },
                                {
                                    name: 'lastName',
                                    label: localizationService.t('LASTNAME'),
                                    rules: 'required_with:companyProfile.contactPerson.firstName|required_with:companyProfile.contactPerson.address.addressLine1|required_with:companyProfile.contactPerson.address.addressLine2|required_with:companyProfile.contactPerson.address.city|required_with:companyProfile.contactPerson.address.state|required_with:companyProfile.contactPerson.address.zipCode|required_with:companyProfile.contactPerson.emailAddress.email|required_with:companyProfile.contactPerson.phoneNumber.number|string'
                                },
                                {
                                    name: 'address',
                                    fields: [
                                        {
                                            name: 'addressLine1',
                                            label: localizationService.t('ADDRESS.ADDRESSLINE1'),
                                            rules: 'required_with:companyProfile.contactPerson.firstName|required_with:companyProfile.contactPerson.lastName|required_with:companyProfile.contactPerson.address.addressLine2|required_with:companyProfile.contactPerson.address.city|required_with:companyProfile.contactPerson.address.state|required_with:companyProfile.contactPerson.address.zipCode|required_with:companyProfile.contactPerson.emailAddress.email|required_with:companyProfile.contactPerson.phoneNumber.number|string'
                                        },
                                        {
                                            name: 'addressLine2',
                                            label: localizationService.t('ADDRESS.ADDRESSLINE2')
                                        },
                                        {
                                            name: 'city',
                                            label: localizationService.t('ADDRESS.CITY'),
                                            rules: 'required_with:companyProfile.contactPerson.firstName|required_with:companyProfile.contactPerson.lastName|required_with:companyProfile.contactPerson.address.addressLine1|required_with:companyProfile.contactPerson.address.addressLine2|required_with:companyProfile.contactPerson.address.state|required_with:companyProfile.contactPerson.address.zipCode|required_with:companyProfile.contactPerson.emailAddress.email|required_with:companyProfile.contactPerson.phoneNumber.number|string'
                                        },
                                        {
                                            name: 'state',
                                            label: localizationService.t('ADDRESS.STATE'),
                                            rules: 'required_with:companyProfile.contactPerson.firstName|required_with:companyProfile.contactPerson.lastName|required_with:companyProfile.contactPerson.address.addressLine1|required_with:companyProfile.contactPerson.address.addressLine2|required_with:companyProfile.contactPerson.address.city|required_with:companyProfile.contactPerson.address.zipCode|required_with:companyProfile.contactPerson.emailAddress.email|required_with:companyProfile.contactPerson.phoneNumber.number|string'
                                        },
                                        {
                                            name: 'zipCode',
                                            label: localizationService.t('ADDRESS.ZIPCODE'),
                                            rules: 'required_with:companyProfile.contactPerson.firstName|required_with:companyProfile.contactPerson.lastName|required_with:companyProfile.contactPerson.address.addressLine1|required_with:companyProfile.contactPerson.address.addressLine2|required_with:companyProfile.contactPerson.address.city|required_with:companyProfile.contactPerson.address.state|required_with:companyProfile.contactPerson.emailAddress.email|required_with:companyProfile.contactPerson.phoneNumber.number|string'
                                        },
                                    ]
                                },
                                {
                                    name: 'emailAddress',
                                    fields: [
                                        {
                                            name: 'email',
                                            label: localizationService.t('EMAILADDRESS.EMAIL'),
                                            rules: 'required_with:companyProfile.contactPerson.firstName|required_with:companyProfile.contactPerson.lastName|required_with:companyProfile.contactPerson.address.addressLine1|required_with:companyProfile.contactPerson.address.addressLine2|required_with:companyProfile.contactPerson.address.city|required_with:companyProfile.contactPerson.address.state|required_with:companyProfile.contactPerson.address.zipCode|required_with:companyProfile.contactPerson.phoneNumber.number|string'
                                        },
                                    ]
                                },
                                {
                                    name: 'phoneNumber',
                                    fields: [
                                        {
                                            name: 'number',
                                            label: localizationService.t('PHONENUMBER.NUMBER'),
                                            rules: 'required_with:companyProfile.contactPerson.firstName|required_with:companyProfile.contactPerson.lastName|required_with:companyProfile.contactPerson.address.addressLine1|required_with:companyProfile.contactPerson.address.addressLine2|required_with:companyProfile.contactPerson.address.city|required_with:companyProfile.contactPerson.address.state|required_with:companyProfile.contactPerson.address.zipCode|required_with:companyProfile.contactPerson.emailAddress.email|string',
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
                    label: localizationService.t('DONORACCOUNTEDITFORM.INITIALCONTRIBUTION'),
                    rules: 'boolean',
                    type: 'checkbox'
                },
                {
                    name: 'contributionMinimumInitial',
                    label: localizationService.t('DONORACCOUNTEDITFORM.CONTRIBUTIONMINIMUMINITIAL'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'contributionMinimumAdditional',
                    label: localizationService.t('DONORACCOUNTEDITFORM.CONTRIBUTIONMINIMUMADDITIONAL'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'grantMinimumAmount',
                    label: localizationService.t('DONORACCOUNTEDITFORM.GRANTMINIMUMAMOUNT'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'grantFee',
                    label: localizationService.t('DONORACCOUNTEDITFORM.GRANTFEE'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'certificateDeduction',
                    label: localizationService.t('DONORACCOUNTEDITFORM.CERTIFICATEDEDUCTION'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'certificateFee',
                    label: localizationService.t('DONORACCOUNTEDITFORM.CERTIFICATEFEE'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'lineOfCredit',
                    label: localizationService.t('DONORACCOUNTEDITFORM.LINEOFCREDIT'),
                    rules: 'required|numeric|min:0',
                },
                {
                    name: 'extraBookletPercentage',
                    label: localizationService.t('DONORACCOUNTEDITFORM.EXTRABOOKLETPERCENTAGE'),
                    rules: 'numeric|min:0',
                },
                {
                    name: 'blankBookletMax',
                    label: localizationService.t('DONORACCOUNTEDITFORM.BLANKBOOKLETMAX'),
                    rules: 'numeric|min:0',
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: localizationService.t('DONORACCOUNTEDITFORM.NOTIFICATIONLIMITREMAINDERAMOUNT'),
                    rules: 'numeric',
                },
            ]
        };
    }
};