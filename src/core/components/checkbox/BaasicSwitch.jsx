import React from 'react';
import PropTypes from 'prop-types';
import { BaasicSwitchTemplate } from 'themes/components';

const BaasicSwitch = function (props) {
    return <BaasicSwitchTemplate {...props} />
};

BaasicSwitch.propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    regular: PropTypes.bool
};

export default BaasicSwitch;
