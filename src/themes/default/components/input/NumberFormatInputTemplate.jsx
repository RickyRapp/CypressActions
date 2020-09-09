import React from 'react';
import { defaultTemplate } from 'core/hoc';
import NumberFormat from 'react-number-format';

const NumberFormatInputTemplate = defaultTemplate((props) => {
    const { t, onChange, onBlur, required } = props;

    const requiredMark = required ? <span>*</span> : null;
    const handleFocus = (event) => { event.target.select(); }

    let formatedPlaceholder = '';
    if (props.placeholder && props.format) {
        formatedPlaceholder = `${t(props.placeholder)} ${props.format}`;
    }
    else if (props.placeholder) {
        formatedPlaceholder = t(props.placeholder);
    }
    else {
        formatedPlaceholder = props.format;
    }

    return (
        <div onFocus={handleFocus}>
            {props.showLabel && <div className='form__group__label'>{t(props.label)}{requiredMark}</div>}
            <NumberFormat
                className={props.className}
                name={props.name}
                type={props.type}
                format={props.format}
                mask={props.mask}
                onValueChange={onChange}
                onBlur={onBlur}
                value={props.value}
                placeholder={formatedPlaceholder}
                displayType={props.displayType}
                thousandSeparator={props.thousandSeparator}
                fixedDecimalScale={props.fixedDecimalScale}
                decimalScale={props.decimalScale}
                prefix={props.prefix}
                disabled={props.disabled}
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
