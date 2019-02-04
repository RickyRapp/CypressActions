import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'core/components';
import DevTools from 'mobx-react-devtools';

function MasterLayoutTemplate({ render, children, initialized, ...props }) {
  if (!initialized) return <Loader />;

  return (
    <React.Fragment>
      <DevTools position={{ bottom: 0 }} />

      {render(props)}
    </React.Fragment>
  );
}

MasterLayoutTemplate.propTypes = {
  render: PropTypes.func
};

export default MasterLayoutTemplate;
