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
                    label: 'Blank Booklet Max',
                    placeholder: 'Enter Blank Booklet Max',
                    rules: 'required|numeric|min:0'
                },
                {
                    name: 'notificationLimitRemainderAmount',
                    label: 'Low balance alert',
                    placeholder: 'Enter Low balance alert',
                    rules: 'numeric|min:0'
                },
                {
                    name: 'deliveryMethodTypeId',
                    label: 'How would you like to get the following reports',
                    placeholder: 'Choose Delivery Metrhod',
                    rules: 'required|string'
                },
                {
                    name: 'coreUser',
                    label: 'Donor',
                    fields: [{
                        name: 'firstName',
                        label: 'First Name',
                        placeholder: 'Enter First Name',
                        rules: 'required|string'
                    }, {
                        name: 'lastName',
                        label: 'Last Name',
                        placeholder: 'Enter Last Name',
                        rules: 'required|string'
                    }, {
                        name: 'middleName',
                        label: 'Middle Name',
                        placeholder: 'Enter Middle Name',
                        rules: 'string'
                    },
                    {
                        name: 'prefixTypeId',
                        label: 'Prefix Type',
                        placeholder: 'Choose Prefix Type',
                        rules: 'string'
                    }
                    ]
                }
            ]
        }
    }
}