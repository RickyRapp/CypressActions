import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BaasicButtonTemplate } from 'themes/components';

class BaasicButton extends Component {
    render() {
        const { type, onClick, disabled, content, className, classNameExtend, onlyIconClassName, label, icon, rotate, onlyIcon, authorization, message } = this.props;

        return (
            <BaasicButtonTemplate
                rotate={rotate}
                type={type}
                className={className}
                classNameExtend={classNameExtend}
                onlyIconClassName={onlyIconClassName}
                disabled={disabled}
                content={content}
                onClick={onClick}
                label={label}
                icon={icon}
                onlyIcon={onlyIcon}
                authorization={authorization}
                message={message}
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
    classNameExtend: PropTypes.string,
    onlyIconClassName: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
    message: PropTypes.string,
    rotate: PropTypes.bool,
    onlyIcon: PropTypes.bool,
    authorization: PropTypes.any
};

BaasicButton.defaultProps = {
    type: 'button',
    onClick: () => { },
    className: 'btn btn--med',
    disabled: false,
    content: null,
    label: 'Button',
    rotate: false,
    onlyIcon: false
};

export default BaasicButton;
