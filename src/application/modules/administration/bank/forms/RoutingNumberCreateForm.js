import { FormBase } from 'core/components';

export default class RoutingNumberCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'region',
                    label: 'ROUTING_NUMBER.CREATE.FIELDS.REGION_LABEL',
                    placeholder: 'ROUTING_NUMBER.CREATE.FIELDS.REGION_PLACEHOLDER',
                    rules: 'required|string'
                },
                {
                    name: 'number',
                    label: 'ROUTING_NUMBER.CREATE.FIELDS.NUMBER_LABEL',
                    placeholder: 'ROUTING_NUMBER.CREATE.FIELDS.NUMBER_PLACEHOLDER',
                    rules: 'required|string|digits:9',
                    extra: {
                        mask: '_',
                        format: '###-###-###'
                    }
                },
                {
                    name: 'bankId',
                    label: 'ROUTING_NUMBER.CREATE.FIELDS.BANK_LABEL',
                    placeholder: 'ROUTING_NUMBER.CREATE.FIELDS.BANK_PLACEHOLDER',
                    rules: 'required|string'
                }
            ]
        };
    }
}