import React from 'react';
import PropTypes from 'prop-types';

function MasterLayoutTemplate({ render, children, ...props }) {
  return (
    <React.Fragment>
      {children}
      {render(props)}
    </React.Fragment>
  );
}

MasterLayoutTemplate.propTypes = {
  render: PropTypes.func
};

export default MasterLayoutTemplate;
