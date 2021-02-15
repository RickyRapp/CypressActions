import React from 'react';
import { defaultTemplate } from 'core/hoc';
import NumberFormat from 'react-number-format';

const NumberFormatInputTemplate = defaultTemplate((props) => {
    const { t, onChange, onBlur, labelClassName, label } = props;

    const handleFocus = (event) => { event.target.select(); }

    let formatedPlaceholder = '';
    if (props.placeholder) {
        formatedPlaceholder = t(props.placeholder);
    }
    else if (props.format) {
        if (_.isString(props.format)) {
            formatedPlaceholder = t(props.format);
        }
    }

    return (
        <div onFocus={handleFocus}>
            {props.showLabel &&
                <label className={labelClassName || ''}>
                    {t(label)}
                </label>}
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
    className: 'input input--lrg input--text',
    mask: '_'
};

export default NumberFormatInputTemplate;
