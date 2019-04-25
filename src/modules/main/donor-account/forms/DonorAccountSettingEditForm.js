import { FormBase } from 'core/components';

export default class DonorAccountSettingEditForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }
    setup() {
        return {
            fields: [
                'securityPin',
                'deliveryMethodTypeId',
                'blankBookletMax',
                'notificationLimitRemainderAmount',
            ],

            labels: {
                'securityPin': 'Security Pin',
                'deliveryMethodTypeId': 'Delivery Method Type',
                'blankBookletMax': 'Blank Booklet Max Amount',
                'notificationLimitRemainderAmount': 'Low Balance Amount',
            },

            placeholders: {
                'deliveryMethodTypeId': 'Choose Delivery Method Type',
                'securityPin': 'Enter Security Pin',
                'blankBookletMax': 'Enter Blank Booklet Max Amount',
                'notificationLimitRemainderAmount': 'Enter Low Balance Amount'
            },

            rules: {
                'deliveryMethodTypeId': 'required|string',
                'securityPin': 'required|string|size:4',
                'blankBookletMax': 'numeric|min:0',
                'notificationLimitRemainderAmount': 'numeric'
            },

            types: {
                'initialContribution': 'checkbox'
            },

            options: {
                'securityPin': {
                    validateOnChange: true
                }
            }
        };
    }
};