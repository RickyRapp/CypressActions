import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BaasicButtonTemplate } from 'themes/components';

class BaasicButton extends Component {
  render() {
    const {
      type,
      onClick,
      disabled,
      content,
      className,
      label,
      icon,
      rotate
    } = this.props;

    return (
      <BaasicButtonTemplate
        rotate={rotate}
        type={type}
        className={className}
        disabled={disabled}
        content={content}
        onClick={onClick}
        label={label}
        icon={icon}
      />
    );
  }
}

BaasicButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  content: PropTypes.any,
  className: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  rotate: PropTypes.bool
};

BaasicButton.defaultProps = {
  type: 'button',
  onClick: () => {},
  className: 'btn btn--med',
  disabled: false,
  content: null,
  label: 'Button',
  rotate: false
};

export default BaasicButton;
