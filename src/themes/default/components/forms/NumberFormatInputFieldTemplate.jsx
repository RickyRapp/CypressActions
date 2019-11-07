import React from 'react';
import { defaultTemplate } from 'core/hoc';

import { NumberFormatInput } from 'core/components';
import { renderIf, isSome } from 'core/utils';
import '@progress/kendo-react-intl'

const NumberFormatInputFieldTemplate = defaultTemplate(({ field, showLabel = true, disabled, onChange }) => {
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

    return (
        <React.Fragment>
            <NumberFormatInput
                className={"input input--med input--text " + (field.localizedError ? "input--warning" : null)}
                required={required}
                showLabel={showLabel}
                label={field.label}
                mask={mask}
                format={format}
                disabled={disabled || field.disabled}
                placeholder={field.placeholder || format}
                onChange={handleOnChange}
                defaultValue={null}
                value={value}
            />
            {renderIf(isSome(field.localizedError))(<div
                className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>)}
        </React.Fragment>
    )
});

export default NumberFormatInputFieldTemplate;
