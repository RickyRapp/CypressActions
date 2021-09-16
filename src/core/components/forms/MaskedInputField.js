import React from 'react';
import PropTypes from 'prop-types';
import { MaskedInputFieldTemplate } from 'themes/components';
import { defaultTemplate } from 'core/hoc';

const MaskedInputField = function (props) {
    return <MaskedInputFieldTemplate {...props} />
};

MaskedInputField.propTypes = {
    field: PropTypes.object.isRequired,
    onChange: PropTypes.func
};

export default defaultTemplate(MaskedInputField);
