import React from 'react';
import { renderIf, isSome, defaultTemplate } from 'core/utils';
import NumberFormat from 'react-number-format';

const BasicFormatFakeInputTemplate = defaultTemplate(({ field, t, label = null, ...props }) => {
    const {
        thousandSeparator,
        decimalSeparator,
        format,
        mask,
        prefix,
        suffix
    } = props;

    return (
        <div className="inputgroup">
            <label htmlFor={field.id}>{label ? t(label) : t(field.label)} </label>
            <NumberFormat
                className={"input input--text input--med padd--top--tny input--disabled"}
                type={field.type}
                value={field.value}
                thousandSeparator={thousandSeparator}
                decimalSeparator={decimalSeparator}
                format={format}
                mask={mask}
                placeholder={field.placeholder}
                prefix={prefix}
                suffix={suffix}
                displayType={'text'}
            />
        </div>
    );
});

export default BasicFormatFakeInputTemplate;
