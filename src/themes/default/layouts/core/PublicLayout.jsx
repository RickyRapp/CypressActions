import React from 'react';
import PropTypes from 'prop-types';

function PublicLayoutTemplate({ render, ...props }) {
  return <main className="body--secondary">{render(props)}</main>;
}

PublicLayoutTemplate.propTypes = {
  render: PropTypes.func
};

export default PublicLayoutTemplate;
