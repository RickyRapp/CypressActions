import { FormBase } from 'core/components';
import { localizationService } from 'core/services'

export default class BankAccountForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: localizationService.t('BANKACCOUNT.NAME'),
                    rules: 'required|string'
                },
                {
                    name: 'accountNumber',
                    label: localizationService.t('BANKACCOUNT.ACCOUNTNUMBER'),
                    rules: 'required|string'
                },
                {
                    name: 'routingNumber',
                    label: localizationService.t('BANKACCOUNT.ROUTINGNUMBER'),
                    rules: 'required|string|digits:9'
                },
                {
                    name: 'description',
                    label: localizationService.t('BANKACCOUNT.DESCRIPTION'),
                    rules: 'string'
                },
                {
                    name: 'image',
                    label: localizationService.t('BANKACCOUNT.IMAGE'),
                    type: 'file'
                },
                {
                    name: 'coreMediaVaultEntryId',
                    rules: 'string'
                },
                {
                    name: 'thirdParty',
                    label: localizationService.t('BANKACCOUNT.THIRDPARTYBANKACCOUNT'),
                    rules: 'boolean',
                    value: false,
                    type: 'checkbox'
                },
                {
                    name: 'thirdPartyAccountHolder',
                    fields: [
                        {
                            name: 'name',
                            label: localizationService.t('BANKACCOUNT.THIRDPARTYACCOUNTHOLDERNAME'),
                            rules: 'string'
                        },
                        {
                            name: 'address',
                            fields: [
                                {
                                    name: 'addressLine1',
                                    label: localizationService.t('ADDRESS.ADDRESSLINE1'),
                                    rules: 'string'
                                },
                                {
                                    name: 'addressLine2',
                                    label: localizationService.t('ADDRESS.ADDRESSLINE2'),
                                    rules: 'string'
                                },
                                {
                                    name: 'city',
                                    label: localizationService.t('ADDRESS.CITY'),
                                    rules: 'string'
                                },
                                {
                                    name: 'state',
                                    label: localizationService.t('ADDRESS.STATE'),
                                    rules: 'string'
                                },
                                {
                                    name: 'zipCode',
                                    label: localizationService.t('ADDRESS.ZIPCODE'),
                                    rules: 'string'
                                }
                            ]
                        },
                        {
                            name: 'emailAddress',
                            fields: [
                                {
                                    name: 'email',
                                    label: localizationService.t('EMAILADDRESS.EMAIL'),
                                    rules: 'email'
                                }
                            ]
                        },
                        {
                            name: 'phoneNumber',
                            fields: [
                                {
                                    name: 'number',
                                    label: localizationService.t('PHONENUMBER.NUMBER'),
                                    rules: 'string'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
