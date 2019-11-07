import React from 'react';
import PropTypes from 'prop-types';
import { NumberFormatInputFieldTemplate } from 'themes/components';
import { defaultTemplate } from 'core/hoc';

const NumberFormatInputField = function (props) {
    return <NumberFormatInputFieldTemplate {...props} />
};

NumberFormatInputField.propTypes = {
    field: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

export default defaultTemplate(NumberFormatInputField);
