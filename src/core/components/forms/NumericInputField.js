import React from 'react';
import PropTypes from 'prop-types';
import { NumericInputFieldTemplate } from 'themes/components';
import { defaultTemplate } from 'core/hoc';

const NumericInputField = function (props) {
    return <NumericInputFieldTemplate {...props} />
};

NumericInputField.propTypes = {
    field: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

export default defaultTemplate(NumericInputField);
