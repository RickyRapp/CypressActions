import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const CharityChangePasswordTemplate = function ({t, charityChangePasswordViewStore}){
    return (
        <div>
        </div>
    )
}

CharityChangePasswordTemplate.propTypes = {
    charityChangePasswordViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(CharityChangePasswordTemplate);