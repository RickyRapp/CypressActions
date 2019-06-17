import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class CharityCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'charityStatusId',
                    label: localizationService.t('CHARITYCREATEFORM.CHARITYSTATUSID'),
                    rules: 'required|string',
                },
                {
                    name: 'charityTypeId',
                    label: localizationService.t('CHARITYCREATEFORM.CHARITYTYPEID'),
                    rules: 'required|string',
                },
                {
                    name: 'dba',
                    label: localizationService.t('CHARITYCREATEFORM.DBA'),
                    rules: 'string',
                },
                {
                    name: 'name',
                    label: localizationService.t('CHARITYCREATEFORM.NAME'),
                    rules: 'required|string',
                },
                {
                    name: 'taxId',
                    label: localizationService.t('CHARITYCREATEFORM.TAXID'),
                    rules: 'required|string|digits:9',
                },
                {
                    name: 'suggestedById',
                    label: localizationService.t('CHARITYCREATEFORM.SUGGESTEDBYID'),
                    rules: 'string',
                },
                {
                    name: 'hasLogin',
                    label: localizationService.t('CHARITYCREATEFORM.HASLOGIN'),
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'sendWelcomeEmail',
                    label: localizationService.t('CHARITYCREATEFORM.SENDWELCOMEEMAIL'),
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'isApproved',
                    label: localizationService.t('CHARITYCREATEFORM.ISAPPROVED'),
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'coreUser',
                    label: localizationService.t('CHARITYCREATEFORM.COREUSER'),
                    fields: [
                        {
                            name: 'userName',
                            label: localizationService.t('CHARITYCREATEFORM.COREUSER.USERNAME'),
                            rules: 'required_if:hasLogin,true|string',
                        },
                        {
                            name: 'coreMembership',
                            label: localizationService.t('CHARITYCREATEFORM.COREUSER.COREMEMBERSHIP'),
                            fields: [
                                {
                                    name: 'password',
                                    label: localizationService.t('CHARITYCREATEFORM.COREUSER.COREMEMBERSHIP.PASSWORD'),
                                    rules: ['required_if:hasLogin,true', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                                    type: 'password'
                                },
                                {
                                    name: 'confirmPassword',
                                    label: localizationService.t('CHARITYCREATEFORM.COREUSER.COREMEMBERSHIP.CONFIRMPASSWORD'),
                                    rules: 'required_if:hasLogin,true|string|same:coreUser.coreMembership.password',
                                    type: 'password'
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'address',
                    label: localizationService.t('CHARITYCREATEFORM.ADDRESS'),
                    fields: [
                        {
                            name: 'addressLine1',
                            label: localizationService.t('CHARITYCREATEFORM.ADDRESS.ADDRESSLINE1'),
                            rules: 'required|string',
                        },
                        {
                            name: 'addressLine2',
                            label: localizationService.t('CHARITYCREATEFORM.ADDRESS.ADDRESSLINE2'),
                            rules: 'string',
                        },
                        {
                            name: 'city',
                            label: localizationService.t('CHARITYCREATEFORM.ADDRESS.CITY'),
                            rules: 'required|string',
                        },
                        {
                            name: 'state',
                            label: localizationService.t('CHARITYCREATEFORM.ADDRESS.STATE'),
                            rules: 'required|string',
                        },
                        {
                            name: 'zipCode',
                            label: localizationService.t('CHARITYCREATEFORM.ADDRESS.ZIPCODE'),
                            rules: 'required|string',
                        },
                    ]
                },
                {
                    name: 'emailAddress',
                    label: localizationService.t('CHARITYCREATEFORM.EMAILADDRESS'),
                    fields: [
                        {
                            name: 'email',
                            label: localizationService.t('CHARITYCREATEFORM.EMAILADDRESS.EMAIL'),
                            rules: 'required|email|string',
                        },
                    ]
                },
                {
                    name: 'hasContact',
                    label: localizationService.t('CHARITYCREATEFORM.HASCONTACT'),
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'contactInformation',
                    label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION'),
                    fields: [
                        {
                            name: 'firstName',
                            label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.FIRSTNAME'),
                            rules: 'required_if:hasContact,true|string',
                        },
                        {
                            name: 'lastName',
                            label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.LASTNAME'),
                            rules: 'required_if:hasContact,true|string',
                        },
                        {
                            name: 'address',
                            label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS'),
                            fields: [
                                {
                                    name: 'addressLine1',
                                    label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.ADDRESSLINE1'),
                                    rules: 'required_if:hasContact,true|string',
                                },
                                {
                                    name: 'addressLine2',
                                    label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.ADDRESSLINE2'),
                                    rules: 'string',
                                },
                                {
                                    name: 'city',
                                    label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.CITY'),
                                    rules: 'required_if:hasContact,true|string',
                                },
                                {
                                    name: 'state',
                                    label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.STATE'),
                                    rules: 'required_if:hasContact,true|string',
                                },
                                {
                                    name: 'zipCode',
                                    label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.ADDRESS.ZIPCODE'),
                                    rules: 'required_if:hasContact,true|string',
                                },
                            ]
                        },
                        {
                            name: 'emailAddress',
                            label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.EMAILADDRESS'),
                            fields: [
                                {
                                    name: 'email',
                                    label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.EMAILADDRESS.EMAIL'),
                                    rules: 'required_if:hasContact,true|email|string',
                                },
                            ]
                        },
                        {
                            name: 'phoneNumber',
                            label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.PHONENUMBER'),
                            fields: [
                                {
                                    name: 'number',
                                    label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.PHONENUMBER.NUMBER'),
                                    rules: 'required_if:hasContact,true|string',
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'bankAccount',
                    label: localizationService.t('CHARITYCREATEFORM.CONTACTINFORMATION.BANKACCOUNT'),
                    fields: [
                        {
                            name: 'name',
                            label: localizationService.t('CHARITYCREATEFORM.BANKACCOUNT.NAME'),
                            rules: 'required|string'
                        },
                        {
                            name: 'accountNumber',
                            label: localizationService.t('CHARITYCREATEFORM.BANKACCOUNT.ACCOUNTNUMBER'),
                            rules: 'required|string'
                        },
                        {
                            name: 'routingNumber',
                            label: localizationService.t('CHARITYCREATEFORM.BANKACCOUNT.ROUTINGNUMBER'),
                            rules: 'required|string|digits:9'
                        },
                        {
                            name: 'description',
                            label: localizationService.t('CHARITYCREATEFORM.BANKACCOUNT.DESCRIPTION'),
                            rules: 'string'
                        },
                        {
                            name: 'image',
                            label: localizationService.t('CHARITYCREATEFORM.BANKACCOUNT.UPLOADIMAGE'),
                            type: 'file',
                        }
                    ]
                }
            ]
        }
    }
};