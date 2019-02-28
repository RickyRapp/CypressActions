import { FormBase } from 'core/components';

export default class DonorAccountProfileEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return {
            fields: [
                'fundName',
                'blankBookletMax',
                'notificationLimitRemainderAmount',
                'deliveryMethodType',
                'coreUser.firstName',
                'coreUser.lastName',
                'coreUser.middleName',
                'coreUser.prefixType'
            ],

            labels: {
                'fundName': 'Fund Name',
                'blankBookletMax': 'Set maximum for hand written certificates',
                'notificationLimitRemainderAmount': 'Low balance alert',
                'deliveryMethodType': 'How would you like to get the following reports',
                'coreUser.firstName': 'First Name',
                'coreUser.lastName': 'Last Name',
                'coreUser.middleName': 'Middle Name',
                'coreUser.prefixType': 'Prefix Types'
            },

            placeholders: {
                'fundName': 'Fund Name',
                'blankBookletMax': 'Set maximum for hand written certificates',
                'notificationLimitRemainderAmount': 'Low balance alert',
                'deliveryMethodType': 'How would you like to get the following reports',
                'coreUser.firstName': 'Enter First Name',
                'coreUser.lastName': 'Enter Last Name',
                'coreUser.middleName': 'Enter Middle Name',
                'coreUser.prefixType': 'Choose Prefix Types'
            },

            rules: {
                'fundName': 'required|string',
                'blankBookletMax': 'required|numeric|min:0',
                'notificationLimitRemainderAmount': 'numeric|min:0',
                'coreUser.firstName': 'required|string',
                'coreUser.middleName': 'string',
                'coreUser.lastName': 'required|string'
            }
        };
    }
};