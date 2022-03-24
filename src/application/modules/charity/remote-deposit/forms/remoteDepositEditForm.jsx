import { FormBase } from "core/components";

export default class remoteDepositEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                // Define your custom fields here. More information regarding form definition can be
                // found in the Mobx React Forms documentation: https://foxhound87.github.io/mobx-react-form/.
                // For the available validation rules check: https://github.com/skaterdav85/validatorjs#available-rules.
                // Example:
                // {
                //     name: "name",
                //     label: "POST.EDIT.NAME_LABEL",
                //     placeholder: "POST.EDIT.NAME_PLACEHOLDER",
                //     rules: "required|string",
                // },
                // {
                //     name: "actice",
                //     type: "checkbox",
                //     label: "POST.EDIT.ACTIVE_LABEL",
                //     placeholder: "POST.EDIT.ACTIVE_PLACEHOLDER",
                //     rules: "boolean",
                // },
                // {
                //     name: "price",
                //     type: "number",
                //     label: "POST.EDIT.PRICE_LABEL",
                //     placeholder: "POST.EDIT.PRICE_PLACEHOLDER",
                //     rules: "required|numeric|min:0",
                // },
            ],
        };
    }
}