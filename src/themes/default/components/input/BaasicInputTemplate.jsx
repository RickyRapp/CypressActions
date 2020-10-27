import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const BaasicInputTemplate = function (props) {
    const {
        t,
        id,
        value,
        onChange,
        type,
        showLabel,
        placeholder,
        name,
        label,
        className,
        labelClassName,
        wrapperClassName,
        disabled,
        checked,
        labelBeforeInput,
        onClick,
        maxLength
    } = props;

    return (
        <div className={`${checked ? 'checked' : ''} ${wrapperClassName}`}>
            {showLabel && labelBeforeInput && (
                <label className={labelClassName || ''} htmlFor={id}>
                    {t(label)}
                </label>
            )}
            <input
                type={type}
                className={className || ''}
                placeholder={t(placeholder)}
                id={id}
                name={name}
                disabled={disabled}
                checked={checked}
                value={value}
                onChange={onChange}
                onClick={onClick}
                maxLength={maxLength}
            />
            {showLabel && !labelBeforeInput && (
                <label className={labelClassName || ''} htmlFor={id}>
                    {t(label)}
                </label>
            )}
        </div>
    );
};

BaasicInputTemplate.propTypes = {
    showLabel: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.any.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    wrapperClassName: PropTypes.string,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    labelBeforeInput: PropTypes.bool,
    t: PropTypes.func,
    onClick: PropTypes.func,
    maxLength: PropTypes.number,
};

BaasicInputTemplate.defaultProps = {
    type: 'text',
    checked: null,
    showLabel: true,
    className: 'input input--med input--text',
    labelClassName: '',
    wrapperClassName: '',
    labelBeforeInput: true,
};

export default defaultTemplate(BaasicInputTemplate);
