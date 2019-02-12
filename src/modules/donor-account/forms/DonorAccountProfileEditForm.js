import { FormBase } from 'core/components';

export default class DonorAccountProfileEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                {
                    name: 'fundName',
                    label: 'Fund Name',
                    placeholder: 'Enter Fund Name',
                    rules: 'required|string'
                },
                {
                    name: 'blankBookletMax',
                    label: 'Set maximum for hand written certificates',
                    placeholder: 'Enter maximum for hand written certificates',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'Low balance alert',
                    placeholder: 'Low balance alert',
                    rules: 'numeric|min:0'
                },
                {
                    name: 'deliveryMethodType',
                    label: 'How would you like to get the following reports',
                    placeholder: 'Delivery Method Types'
                },
                {
                    name: 'coreUser',
                    label: 'Core User',
                    fields: [
                        {
                            name: 'firstName',
                            label: 'First Name',
                            placeholder: 'Enter First Name',
                            rules: 'required|string'
                        },
                        {
                            name: 'middleName',
                            label: 'Middle Name',
                            placeholder: 'Enter Middle Name',
                            rules: 'string'
                        },
                        {
                            name: 'lastName',
                            label: 'Last Name',
                            placeholder: 'Enter Last Name',
                            rules: 'required|string'
                        },
                        {
                            name: 'prefixType',
                            label: 'Prefix Types',
                            placeholder: 'Prefix type'
                        },
                    ]
                }
            ]
        };
    }
};

