import { FormBase } from 'core/components';

export default class CharityResetPasswordForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
					name: 'userName',
					label: 'PASSWORD_RECOVERY.USERNAME_LABEL',
					placeholder: 'PASSWORD_RECOVERY.USERNAME_PLACEHOLDER',
					rules: 'required',
				},
            ]
        };
    }
}