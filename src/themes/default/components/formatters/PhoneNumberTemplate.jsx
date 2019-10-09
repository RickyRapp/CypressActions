import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function PhoneNumberTemplate({ value }) {
    return <span>{value}</span>
}

PhoneNumberTemplate.propTypes = {
    value: PropTypes.any.isRequired
};

export default defaultTemplate(PhoneNumberTemplate);
