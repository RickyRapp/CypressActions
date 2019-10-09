import React from 'react';
import PropTypes from 'prop-types';
import { RowInputTemplate } from 'themes/components';
import { defaultTemplate } from 'core/hoc';

const RowInput = function(props) {
    return <RowInputTemplate {...props} />
};

RowInput.propTypes = {
    field: PropTypes.object.isRequired
};

export default defaultTemplate(RowInput);
