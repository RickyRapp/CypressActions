import { FormBase } from 'core/components';

export default class TestEmailCreateForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'email',
                    label: 'TEST.TEST_EMAIL.CREATE.FIELDS.EMAIL_LABEL',
                    placeholder: 'TEST.TEST_EMAIL.CREATE.FIELDS.EMAIL_PLACEHOLDER',
                    rules: 'required|email'
                },
                {
                    name: 'name',
                    label: 'TEST.TEST_EMAIL.CREATE.FIELDS.NAME_LABEL',
                    placeholder: 'TEST.TEST_EMAIL.CREATE.FIELDS.NAME_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'amount',
                    label: 'TEST.TEST_EMAIL.CREATE.FIELDS.AMOUNT_LABEL',
                    placeholder: 'TEST.TEST_EMAIL.CREATE.FIELDS.AMOUNT_PLACEHOLDER',
                    rules: 'numeric|min:0',
                    extra: {
                        type: 'c2'
                    }
                },
                {
                    name: 'confirmationNumber',
                    label: 'TEST.TEST_EMAIL.CREATE.FIELDS.CONFIRMATION_NUMBER_LABEL',
                    placeholder: 'TEST.TEST_EMAIL.CREATE.FIELDS.CONFIRMATION_NUMBER_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'paymentTypeId',
                    label: 'TEST.TEST_EMAIL.CREATE.FIELDS.PAYMENT_TYPE_LABEL',
                    placeholder: 'TEST.TEST_EMAIL.CREATE.FIELDS.PAYMENT_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'accountTypeId',
                    label: 'TEST.TEST_EMAIL.CREATE.FIELDS.ACCOUNT_TYPE_LABEL',
                    placeholder: 'TEST.TEST_EMAIL.CREATE.FIELDS.ACCOUNT_TYPE_PLACEHOLDER',
                    rules: 'string'
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: 'TEST.TEST_EMAIL.CREATE.FIELDS.DELIVERY_METHOD_TYPE_LABEL',
                    placeholder: 'TEST.TEST_EMAIL.CREATE.FIELDS.DELIVERY_METHOD_TYPE_PLACEHOLDER',
                    rules: 'string'
                }
            ]
        };
    }
}