import React from 'react';
import { defaultTemplate } from 'core/hoc';

import { NumberFormatInput } from 'core/components';
import { renderIf, isSome } from 'core/utils';
import '@progress/kendo-react-intl'

const NumberFormatInputFieldTemplate = defaultTemplate(({ field, showLabel = true, disabled, onChange, onBlur }) => {
    const required = field.rules && field.rules.indexOf('required') !== -1;

    let mask = '';
    let format = '';
    if (field.extra) {
        if (field.extra.mask) {
            mask = field.extra.mask;
        }
        if (field.extra.format) {
            format = field.extra.format;
        }
    }

    const value = field.value === '' ? null : field.value;

    const handleOnChange = (event) => {
        field.onChange(event.value);

        if (onChange) {
            onChange(event.value)
        }
    }

    const handleOnBlur = (event) => {
        // field.onBlur(event.value); //onBlur is called in onValueChange (that's how is done in react-number-format) so there is no need to update field again.

        if (onBlur) {
            onBlur(event.target.value)
        }
    }

    return (
        <React.Fragment>
            <NumberFormatInput
                className={'input input--med input--text' + (field.touched && !field.isValid ? ' input--warning' : '')}
                required={required}
                showLabel={showLabel}
                label={field.label}
                mask={mask}
                format={format}
                disabled={disabled || field.disabled}
                placeholder={field.placeholder}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                defaultValue={null}
                value={value}
            />
            {renderIf(isSome(field.localizedError))(
                <p className="type--tny type--color--warning u-mar--top--nano">{field.localizedError}</p>)}
        </React.Fragment>
    )
});

export default NumberFormatInputFieldTemplate;
