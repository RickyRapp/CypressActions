import { FormBase } from 'core/components';
import moment from 'moment';

export default class CharityOnlineAccountForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'notifyAdministrators',
                    label: 'CHARITY.CREATE.FIELDS.NOTIFY_ADMINISTRATORS_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.NOTIFY_ADMINISTRATORS_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'sendWelcomeEmail',
                    label: 'CHARITY.CREATE.FIELDS.SEND_WELCOME_EMAIL_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.SEND_WELCOME_EMAIL_PLACEHOLDER',
                    rules: 'required|boolean',
                    type: 'checkbox'
                },
                {
                    name: 'activationUrl',
                    rules: 'string'
                },
                {
                    name: 'charityAccountTypeId',
                    label: 'CHARITY.CREATE.FIELDS.CHARITY_ACCOUNT_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.CHARITY_ACCOUNT_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'subscriptionTypeId',
                    label: 'CHARITY.CREATE.FIELDS.SUBSCRIPTION_TYPE_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.SUBSCRIPTION_TYPE_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'subscriptionAmount',
                    label: 'CHARITY.CREATE.FIELDS.SUBSCRIPTION_AMOUNT_LABEL',
                    placeholder: 'CHARITY.CREATE.FIELDS.SUBSCRIPTION_AMOUNT_PLACEHOLDER',
                    rules: 'required|numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'subscriptionNextDate',
                    label: 'CHARITY.CREATE.FIELDS.SUBSCRIPTION_NEXT_DATE_LABEL',
                    rules: `required|min_date:${moment().format('YYYY-MM-DD')}|before_or_equal_date:${moment().add(30, 'days').format('YYYY-MM-DD')}`,
                    type: 'date'
                },
                {
                    name: 'coreUser',
                    fields: [
                        {
                            name: 'username',
                            label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.USERNAME_LABEL',
                            placeholder: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.USERNAME_PLACEHOLDER',
                            rules: 'required|email',
                            autoComplete: 'off'
                        },
                        {
                            name: 'coreMembership',
                            fields: [
                                {
                                    name: 'password',
                                    label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.PASSWORD_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.PASSWORD_PLACEHOLDER',
                                    rules: ['required', 'string', 'min:8', 'regex:/([^a-zA-Z\\d])+([a-zA-Z\\d])+|([a-zA-Z\\d])+([^a-zA-Z\\d])+/'],
                                    type: 'password',
                                    autoComplete: 'off'
                                },
                                {
                                    name: 'confirmPassword',
                                    label: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_LABEL',
                                    placeholder: 'CHARITY.CREATE.FIELDS.LOGIN_FORM_FIELDS.CONFIRM_PASSWORD_PLACEHOLDER',
                                    rules: 'string|same:coreUser.coreMembership.password',
                                    type: 'password'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
}