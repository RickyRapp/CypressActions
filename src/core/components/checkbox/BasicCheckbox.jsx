import React from 'react';
import PropTypes from 'prop-types';
import {BasicCheckboxTemplate} from 'themes/components';

const BasicCheckbox = function(props) {
    return <BasicCheckboxTemplate {...props} />
};

BasicCheckbox.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string
};

export default BasicCheckbox;
