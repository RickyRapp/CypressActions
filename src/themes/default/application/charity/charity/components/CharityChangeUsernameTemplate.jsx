import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const CharityChangeUsernameTemplate = function ({t, charityChangeUsernameViewStore}){
    return (
        <div>
        </div>
    )
}

CharityChangeUsernameTemplate.propTypes = {
    charityChangeUsernameViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityChangeUsernameTemplate);