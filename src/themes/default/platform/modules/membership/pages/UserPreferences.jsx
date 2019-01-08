import React from 'react';
import { defaultTemplate } from 'core/utils';

function UserPreferencesTemplate({ membershipStore }) {
    return (
        <div>
            <span>Username: </span>
            <span>{membershipStore.rootStore.authStore.user.userName}</span>
        </div>
    )
}

export default defaultTemplate(UserPreferencesTemplate);