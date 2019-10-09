import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { MaskedTextBox } from '@progress/kendo-react-inputs';

const BaasicMaskedInputTemplate = function (props) {
    const { t, value, onChange, type, showLabel, placeholder, name, label, className, labelClassName, disabled, mask } = props;
    return (
        <div>
            {showLabel && <div className={labelClassName}>{t(label)}</div>}
            <MaskedTextBox
                type={type}
                className={className}
                placeholder={t(placeholder)}
                name={name}
                disabled={disabled}
                value={value}
                onChange={onChange}
                mask={mask}
            />
        </div>
    )
};

BaasicMaskedInputTemplate.propTypes = {
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
    t: PropTypes.func,
    mask: PropTypes.string.isRequired
};

BaasicMaskedInputTemplate.defaultProps = {
    type: 'text',
    showLabel: true,
    labelClassName: 'form__group__label',
    className: 'input input--med input--text'
};

export default defaultTemplate(BaasicMaskedInputTemplate);
