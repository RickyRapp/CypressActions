import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

const BaasicInputTemplate = function (props) {
    const { t, value, onChange, type, showLabel, placeholder, name, label, className, labelClassName, disabled } = props;
    return (
        <div>
            {showLabel && <div className={labelClassName}>{t(label)}</div>}
            <input type={type} className={className} placeholder={t(placeholder)} name={name} disabled={disabled} value={value} onChange={onChange} />
        </div>
    )
};

BaasicInputTemplate.propTypes = {
    showLabel: PropTypes.bool,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.any.required,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    labelClassName: PropTypes.string,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    t: PropTypes.func
};

BaasicInputTemplate.defaultProps = {
    type: 'text',
    showLabel: true,
    labelClassName: 'form__group__label',
    className: 'input input--med input--text'
};

export default defaultTemplate(BaasicInputTemplate);
