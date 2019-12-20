import React from 'react';
import { defaultTemplate } from 'core/hoc';
import NumberFormat from 'react-number-format';

const NumberFormatInputTemplate = defaultTemplate((props) => {
    const { t, value, onChange, format, mask, label, required, className, name, displayType,
        thousandSeparator, prefix, type, placeholder, decimalScale, fixedDecimalScale, disabled } = props;
    const showLabel = props.showLabel === undefined ? true : props.showLabel;

    const requiredMark = required ? <span>*</span> : null;
    const handleFocus = (event) => { event.target.select(); }

    return (
        <div onFocus={handleFocus}>
            {showLabel && <div className='form__group__label'>{t(label)}{requiredMark}</div>}
            <NumberFormat
                className={className}
                name={name}
                type={type}
                format={format}
                mask={mask}
                onValueChange={onChange}
                value={value}
                placeholder={placeholder ? t(placeholder) : format}
                displayType={displayType}
                thousandSeparator={thousandSeparator}
                fixedDecimalScale={fixedDecimalScale}
                decimalScale={decimalScale}
                prefix={prefix}
                disabled={disabled}
            />
        </div>
    )
});

NumberFormatInputTemplate.defaultProps = {
    labelClassName: 'form__group__label',
    className: 'input input--med input--text',
    mask: '_'
};

export default NumberFormatInputTemplate;
