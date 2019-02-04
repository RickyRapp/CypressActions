import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/utils';

const iconName = name => (name ? 'icon-' + name : '');

const BaasicButtonTemplate = defaultTemplate(
  ({
    onlyIcon = false,
    disabled = false,
    content = null,
    type = 'button',
    className,
    onClick,
    label,
    rotate = false,
    icon
  }) => (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {content || (
        <span>
          <span className={`icomoon ${iconName(icon)}`} />
          {!onlyIcon && <b>{label}</b>}
        </span>
      )}
    </button>
  )
);

export default BaasicButtonTemplate;
