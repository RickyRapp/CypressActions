import { FormBase } from 'core/components';

export default class RoleEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'name',
                    label: 'ROLE.EDIT.NAME_LABEL',
                    placeholder: 'ROLE.EDIT.NAME_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'description',
                    label: 'ROLE.EDIT.DESCRIPTION_LABEL',
                    placeholder: 'ROLE.EDIT.DESCRIPTION_PLACEHOLDER',
                    type: 'textarea',                    
                    rules: 'string'
                }],
        };
    }
}