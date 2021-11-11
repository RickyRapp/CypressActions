import React from 'react';
import PropTypes from 'prop-types';
import { BaasicToggleTemplate } from 'themes/components';

const BaasicToggle = function (props) {
    return <BaasicToggleTemplate {...props} />
};

BaasicToggle.propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    showLabel: PropTypes.bool,
    label: PropTypes.string,
    wrapperClassName: PropTypes.string
};

export default BaasicToggle;
