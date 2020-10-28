import React from 'react';
import { defaultTemplate, withAuth } from 'core/hoc';
import { isSome } from 'core/utils';
import { PropTypes } from 'prop-types';

const iconName = name => (name ? '' + name : '');

const BaasicButtonTemplate = function ({ onClick, authorization, ...otherProps }) {
    return <AuthContent authorization={authorization} onAction={onClick} {...otherProps} />;
};

BaasicButtonTemplate.propTypes = {
    onClick: PropTypes.func,
    authorization: PropTypes.any,
};

const AuthContent = withAuth(DefaultContent);

function DefaultContent({
    onlyIcon = false,
    disabled = false,
    content = null,
    type = 'button',
    className,
    onAction,
    label,
    icon,
    t,
}) {
    return onAction ? (
        <button type={type} disabled={disabled} onClick={onAction} className={className} title={t(label)}>
            {isSome(content) ? (
                content
            ) : (
                <div className="u-display--flex u-display--flex--align--center">
                    <span>
                        {!onlyIcon && t(label)}
                    </span>
                    {icon ? <i className={`${iconName(icon)} u-mar--left--med`} /> : "" }
                </div>
                )}
        </button>
    ) : null;
}

DefaultContent.propTypes = {
    onlyIcon: PropTypes.bool,
    disabled: PropTypes.bool,
    content: PropTypes.any,
    type: PropTypes.string,
    className: PropTypes.string,
    onAction: PropTypes.func,
    label: PropTypes.string,
    icon: PropTypes.string,
    t: PropTypes.func,
};

export default defaultTemplate(BaasicButtonTemplate);
