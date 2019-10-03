import React, { Component } from "react";
import PropTypes from "prop-types";
import { defaultTemplate } from "core/utils";

const iconName = name => (name ? "icon-" + name : "");

const BaasicButtonTemplate = function (
  {
    onlyIcon = false,
    disabled = false,
    content = null,
    type = "button",
    className,
    onClick,
    label,
    rotate = false,
    icon,
    t
  }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {content || (
        <span>
          <span className={`icomoon ${iconName(icon)}`} />
          {!onlyIcon && t(label)}
        </span>
      )}
    </button>
  );
}

export default defaultTemplate(BaasicButtonTemplate);
