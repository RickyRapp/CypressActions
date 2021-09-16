import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function UserPreferencesTemplate({ authStore }) {
    if (!authStore) { return null; }

    return (
        <div>
            <span>Username: </span>
            <span>{authStore.user.userName}</span>
        </div>
    )
}

UserPreferencesTemplate.propTypes = {
    authStore: PropTypes.object
};

export default defaultTemplate(UserPreferencesTemplate);