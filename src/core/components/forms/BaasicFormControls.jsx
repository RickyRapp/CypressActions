import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {BaasicFormControlsTemplate} from 'themes/components';

const BaasicFormControls = function (props) {
    return <BaasicFormControlsTemplate {...props} />
};

BaasicFormControls.propTypes = {
    form: PropTypes.any.isRequired,
    controls: PropTypes.any
};

export default BaasicFormControls;
