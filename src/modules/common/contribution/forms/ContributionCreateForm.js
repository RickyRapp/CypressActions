import { FormBase } from 'core/components';
import { localizationService } from 'core/services'
import moment from 'moment';

export default class ContributionCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'donorAccountId',
                    rules: 'required|string'
                },
                {
                    name: 'amount',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.AMOUNT'),
                    rules: 'required|numeric'
                },
                {
                    name: 'description',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.DESCRIPTION'),
                    rules: 'string'
                },
                {
                    name: 'paymentTypeId',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYMENTTYPEID'),
                    rules: 'required|string'
                },
                {
                    name: 'bankAccountId',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.BANKACCOUNTID'),
                    rules: 'string'
                },
                {
                    name: 'checkNumber',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.CHECKNUMBER'),
                    rules: 'string'
                },
                {
                    name: 'payerInformation',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION'),
                    fields: [
                        {
                            name: 'name',
                            label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.NAME'),
                            rules: 'required|string'
                        },
                        {
                            name: 'address',
                            label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS'),
                            fields: [
                                {
                                    name: 'addressLine1',
                                    label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE1'),
                                    rules: 'required|string'
                                },
                                {
                                    name: 'addressLine2',
                                    label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE2'),
                                    rules: 'string'
                                },
                                {
                                    name: 'city',
                                    label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.CITY'),
                                    rules: 'required|string'
                                },
                                {
                                    name: 'state',
                                    label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.STATE'),
                                    rules: 'required|string'
                                },
                                {
                                    name: 'zipCode',
                                    label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.ZIPCODE'),
                                    rules: 'required|string'
                                },
                            ]
                        },
                        {
                            name: 'emailAddress',
                            label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.EMAILADDRESS'),
                            fields: [
                                {
                                    name: 'email',
                                    label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.EMAILADDRESS.EMAIL'),
                                    rules: 'required|string'
                                },
                            ]
                        },
                        {
                            name: 'phoneNumber',
                            label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.PHONENUMBER'),
                            fields: [
                                {
                                    name: 'number',
                                    label: localizationService.t('CONTRIBUTIONCREATEFORM.PAYERINFORMATION.PHONENUMBER.NUMBER'),
                                    rules: 'required|string'
                                },
                            ]
                        },
                    ]
                },
                {
                    name: 'financialInstitution',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTION'),
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionAddressLine1',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONADDRESSLINE1'),
                    rules: 'string',
                    related: ['financialInstitutionAddressLine2', 'financialInstitutionCity', 'financialInstitutionState', 'financialInstitutionZipCode']
                },
                {
                    name: 'financialInstitutionAddressLine2',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONADDRESSLINE2'),
                    rules: 'string'
                },
                {
                    name: 'financialInstitutionCity',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONCITY'),
                    rules: 'string',
                    related: ['financialInstitutionAddressLine1', 'financialInstitutionAddressLine2', 'financialInstitutionState', 'financialInstitutionZipCode']
                },
                {
                    name: 'financialInstitutionState',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONSTATE'),
                    rules: 'string',
                    related: ['financialInstitutionAddressLine1', 'financialInstitutionAddressLine2', 'financialInstitutionCity', 'financialInstitutionZipCode']
                },
                {
                    name: 'financialInstitutionZipCode',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONZIPCODE'),
                    rules: 'string',
                    related: ['financialInstitutionAddressLine1', 'financialInstitutionAddressLine2', 'financialInstitutionCity', 'financialInstitutionState']
                },
                {
                    name: 'financialInstitutionPhoneNumber',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONPHONENUMBER'),
                    rules: 'string'
                },
                {
                    name: 'accountNumber',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.ACCOUNTNUMBER'),
                    rules: 'string'
                },
                {
                    name: 'securityType',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.SECURITYTYPE'),
                    rules: 'string'
                },
                {
                    name: 'securitySymbol',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.SECURITYSYMBOL'),
                    rules: 'string'
                },
                {
                    name: 'numberOfShares',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.NUMBEROFSHARES'),
                    rules: 'numeric|min:0'
                },
                {
                    name: 'estimatedValue',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.ESTIMATEDVALUE'),
                    rules: 'numeric|min:10000'
                },
                {
                    name: 'transactionId',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.TRANSACTIONID'),
                    rules: 'string'
                },
                {
                    name: 'memo',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.MEMO'),
                    rules: 'string'
                },
                {
                    name: 'settingAmount',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.SETTINGAMOUNT'),
                    rules: 'required_with:contributionSettingTypeId|string'
                },
                {
                    name: 'settingBankAccountId',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.SETTINGBANKACCOUNTID'),
                    rules: 'required_with:contributionSettingTypeId|string'
                },
                {
                    name: 'contributionSettingTypeId',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.CONTRIBUTIONSETTINGTYPEID'),
                    rules: 'string'
                },
                {
                    name: 'settingStartDate',
                    label: localizationService.t('CONTRIBUTIONCREATEFORM.SETTINGSTARTDATE'),
                    rules: `date|after:' + ${moment(new Date).add(1, 'days').format('MM/DD/YYYY')}`
                }
            ]
        }
    }
};