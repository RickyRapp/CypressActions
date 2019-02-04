import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import { EditFormLayoutTemplate } from 'themes/layouts';

const EditFormLayout = function(props) {
  return <EditFormLayoutTemplate {...props} />;
};

EditFormLayout.propTypes = {
  loading: PropTypes.bool,
  form: PropTypes.object.isRequired,
  isEdit: PropTypes.bool.isRequired
};

export default inject((i, props) => ({
  rootStore: i.rootStore
}))(EditFormLayout);
