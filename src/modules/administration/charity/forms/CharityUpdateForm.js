import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class CharityUpdateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: localizationService.t('CHARITYUPDATEFORM.NAME'),
                    rules: 'required|string',
                },
                {
                    name: 'taxId',
                    label: localizationService.t('CHARITYUPDATEFORM.TAXID'),
                    rules: 'required|string|digits:9',
                    disabled: true
                },
                {
                    name: 'charityStatusId',
                    label: localizationService.t('CHARITYUPDATEFORM.CHARITYSTATUSID'),
                    rules: 'required|string',
                },
                {
                    name: 'charityTypeId',
                    label: localizationService.t('CHARITYUPDATEFORM.CHARITYTYPEID'),
                    rules: 'required|string',
                },
                {
                    name: 'dba',
                    label: localizationService.t('CHARITYUPDATEFORM.DBA'),
                    rules: 'string',
                },
                {
                    name: 'emailAddress',
                    label: localizationService.t('CHARITYUPDATEFORM.EMAILADDRESS'),
                    fields: [
                        {
                            name: 'email',
                            label: localizationService.t('CHARITYUPDATEFORM.EMAILADDRESS.EMAIL'),
                            rules: 'required|email|string',
                        },
                    ]
                },
                {
                    name: 'contactInformation',
                    label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION'),
                    fields: [
                        {
                            name: 'firstName',
                            label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.FIRSTNAME'),
                            rules: 'required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                        },
                        {
                            name: 'lastName',
                            label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.LASTNAME'),
                            rules: 'required_with:contactInformation.firstName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                        },
                        {
                            name: 'address',
                            label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS'),
                            fields: [
                                {
                                    name: 'addressLine1',
                                    label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.ADDRESSLINE1'),
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                                },
                                {
                                    name: 'addressLine2',
                                    label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.ADDRESSLINE2'),
                                    rules: 'string',
                                },
                                {
                                    name: 'city',
                                    label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.CITY'),
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                                },
                                {
                                    name: 'state',
                                    label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.STATE'),
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                                },
                                {
                                    name: 'zipCode',
                                    label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.ADDRESS.ZIPCODE'),
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.addressLine2|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.emailAddress.email|required_with:contactInformation.phoneNumber.number|string',
                                },
                            ]
                        },
                        {
                            name: 'emailAddress',
                            label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.EMAILADDRESS'),
                            fields: [
                                {
                                    name: 'email',
                                    label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.EMAILADDRESS.EMAIL'),
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.phoneNumber.number|string',
                                },
                            ]
                        },
                        {
                            name: 'phoneNumber',
                            label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.PHONENUMBER'),
                            fields: [
                                {
                                    name: 'number',
                                    label: localizationService.t('CHARITYUPDATEFORM.CONTACTINFORMATION.PHONENUMBER.NUMBER'),
                                    rules: 'required_with:contactInformation.firstName|required_with:contactInformation.lastName|required_with:contactInformation.address.addressLine1|required_with:contactInformation.address.city|required_with:contactInformation.address.state|required_with:contactInformation.address.zipCode|required_with:contactInformation.emailAddress.email|string',
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'bankAccount',
                    label: localizationService.t('CHARITYUPDATEFORM.BANKACCOUNT'),
                    fields: [
                        {
                            name: 'name',
                            label: localizationService.t('CHARITYUPDATEFORM.BANKACCOUNT.NAME'),
                            rules: 'required_with:bankAccount.accountNumber|required_with:bankAccount.routingNumber|required_with:bankAccount.description|string'
                        },
                        {
                            name: 'accountNumber',
                            label: localizationService.t('CHARITYUPDATEFORM.BANKACCOUNT.ACCOUNTNUMBER'),
                            rules: 'required_with:bankAccount.name|required_with:bankAccount.routingNumber|required_with:bankAccount.description|string'
                        },
                        {
                            name: 'routingNumber',
                            label: localizationService.t('CHARITYUPDATEFORM.BANKACCOUNT.ROUTINGNUMBER'),
                            rules: 'required_with:bankAccount.name|required_with:bankAccount.accountNumber|required_with:bankAccount.description|string|digits:9'
                        },
                        {
                            name: 'description',
                            label: localizationService.t('CHARITYUPDATEFORM.BANKACCOUNT.DESCRIPTION'),
                            rules: 'string'
                        },
                        {
                            name: 'image',
                            label: localizationService.t('CHARITYUPDATEFORM.BANKACCOUNT.UPLOADIMAGE'),
                            type: 'file',
                        },
                        {
                            name: 'coreMediaVaultEntryId',
                            rules: 'required|string',
                        }
                    ]
                }
            ]
        }
    };
}

