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
    message,
    className,
    onlyIconClassName,
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
                <React.Fragment>
                    {!onlyIcon && t(label)}
                    {onlyIcon ? <i className={`${iconName(icon)} ${onlyIconClassName ? onlyIconClassName : ""}`} /> : icon ? <i className={`${iconName(icon)} u-mar--left--sml`} /> : null}
                    {message &&
                        <div className="message--soon">{message}</div>
                    }
                </React.Fragment>
            )}
        </button>
    ) : null;
}

DefaultContent.propTypes = {
    onlyIcon: PropTypes.bool,
    disabled: PropTypes.bool,
    content: PropTypes.any,
    type: PropTypes.string,
    message: PropTypes.string,
    className: PropTypes.string,
    onlyIconClassName: PropTypes.string,
    onAction: PropTypes.func,
    label: PropTypes.string,
    icon: PropTypes.string,
    t: PropTypes.func,
};

export default defaultTemplate(BaasicButtonTemplate);
