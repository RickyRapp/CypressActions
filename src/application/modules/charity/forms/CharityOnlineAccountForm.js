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