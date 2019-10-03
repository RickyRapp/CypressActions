import React from 'react';
import PropTypes from 'prop-types';
import { BasicInputTemplate } from 'themes/components';
import { defaultTemplate } from 'core/utils';

const BasicInput = function (props) {
  return <BasicInputTemplate {...props} />
};

BasicInput.propTypes = {
  field: PropTypes.object.isRequired
};

export default defaultTemplate(BasicInput);
