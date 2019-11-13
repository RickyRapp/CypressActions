import {FormBase} from 'core/components';

export const userProfileFormProperties = {
    fields: [
        {
            name: 'dob',
            label: 'USER.USER_PROFILE_FIELDS.BIRTHDAY_LABEL'
        },
        {
            name: 'address',
            label: 'USER.USER_PROFILE_FIELDS.STREET_LABEL'
        },
        {
            name: 'zipCode',
            label: 'USER.USER_PROFILE_FIELDS.ZIP_LABEL'
        },
        {
            name: 'city',
            label: 'USER.USER_PROFILE_FIELDS.CITY_LABEL'
        },
        {
            name: 'country',
            label: 'USER.USER_PROFILE_FIELDS.COUNTRY_LABEL'
        },
        {
            name: 'mobilePhone',
            label: 'USER.USER_PROFILE_FIELDS.MOBILE_PHONE_LABEL'
        }
    ]
};

export default class UserProfileForm extends FormBase {
    constructor(hooks) {
        super(hooks);
    }

    setup() {
        return userProfileFormProperties;
    }
}
