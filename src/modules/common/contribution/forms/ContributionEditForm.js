import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class ContributionEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'id',
                    rules: 'required|string'
                },
                {
                    name: 'donorAccountId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.AMOUNT'),
                    rules: 'required|numeric'
                },
                {
                    name: 'description',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.DESCRIPTION'),
                    rules: 'string'
                },
                {
                    name: 'paymentTypeId',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.PAYMENTTYPEID'),
                    rules: 'required|string'
                },
                {
                    name: 'bankAccountId',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.BANKACCOUNTID'),
                    rules: 'string'
                },
                {
                    name: 'checkNumber',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.CHECKNUMBER'),
                    rules: 'string'
                },
                {
                    name: 'payerInformation',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION'),
                    fields: [
                        {
                            name: 'firstName',
                            label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.FIRSTNAME'),
                            rules: 'required|string'
                        },
                        {
                            name: 'lastName',
                            label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.LASTNAME'),
                            rules: 'required|string'
                        },
                        {
                            name: 'address',
                            label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS'),
                            fields: [
                                {
                                    name: 'addressLine1',
                                    label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE1'),
                                    rules: 'required|string'
                                },
                                {
                                    name: 'addressLine2',
                                    label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE2'),
                                    rules: 'string'
                                },
                                {
                                    name: 'city',
                                    label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.CITY'),
                                    rules: 'required|string'
                                },
                                {
                                    name: 'state',
                                    label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.STATE'),
                                    rules: 'required|string'
                                },
                                {
                                    name: 'zipCode',
                                    label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.ZIPCODE'),
                                    rules: 'required|string'
                                },
                            ]
                        },
                        {
                            name: 'emailAddress',
                            label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.EMAILADDRESS'),
                            fields: [
                                {
                                    name: 'email',
                                    label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.EMAILADDRESS.EMAIL'),
                                    rules: 'required|string'
                                },
                            ]
                        },
                        {
                            name: 'phoneNumber',
                            label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.PHONENUMBER'),
                            fields: [
                                {
                                    name: 'number',
                                    label: localizationService.t('CONTRIBUTIONEDITFORM.PAYERINFORMATION.PHONENUMBER.NUMBER'),
                                    rules: 'required|string'
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'financialInstitution',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.FINANCIALINSTITUTION'),
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionAddressLine1',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONADDRESSLINE1'),
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionAddressLine2',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONADDRESSLINE2'),
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionCity',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONCITY'),
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionState',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONSTATE'),
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionZipCode',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONZIPCODE'),
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionPhoneNumber',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONPHONENUMBER'),
                    rules: 'string'
                },
                {
                    name: 'accountNumber',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.ACCOUNTNUMBER'),
                    rules: 'string'
                },
                {
                    name: 'securityType',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.SECURITYTYPE'),
                    rules: 'string'
                },
                {
                    name: 'securitySymbol',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.SECURITYSYMBOL'),
                    rules: 'string'
                },
                {
                    name: 'numberOfShares',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.NUMBEROFSHARES'),
                    rules: 'numeric|min:0'
                },
                {
                    name: 'estimatedValue',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.ESTIMATEDVALUE'),
                    rules: 'numeric|min:10000'
                },
                {
                    name: 'transactionId',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.TRANSACTIONID'),
                    rules: 'string'
                },
                {
                    name: 'memo',
                    label: localizationService.t('CONTRIBUTIONEDITFORM.MEMO'),
                    rules: 'string'
                }
            ]
        }
    }
};