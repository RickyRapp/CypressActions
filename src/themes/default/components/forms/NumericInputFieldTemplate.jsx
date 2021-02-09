import React from 'react';
import { defaultTemplate } from 'core/hoc';

import { NumericInput } from 'core/components';
import { renderIf, isSome } from 'core/utils';
import '@progress/kendo-react-intl'

const NumericInputFieldTemplate = defaultTemplate(({ field, showLabel = true, disabled, onChange, onBlur }) => {
    const required = field.rules && field.rules.indexOf('required') !== -1;
    const maxValue = field.rules && field.rules.indexOf('max') !== -1 ? parseInt((/max:(\d+)/).exec(field.rules)[1]) : undefined;
    const minValue = field.rules && field.rules.indexOf('min') !== -1 ? parseInt((/min:(\d+)/).exec(field.rules)[1]) : undefined;

    let type = 'n2';
    if (field.type.indexOf('integer') > -1)
        type = 'n0';

    let step = 1;
    if (field.extra) {
        if (field.extra.type) {
            type = field.extra.type;
        }
        if (field.extra.step) {
            step = field.extra.step;
        }
    }

    const value = field.value === '' ? null : field.value;

    const handleOnChange = (event) => {
        field.onChange(event);

        if (onChange) {
            onChange(event)
        }
    }

    const handleOnBlur = (event) => {
        field.onBlur(event);

        if (onBlur) {
            onBlur(event)
        }
    }

    return (
        <React.Fragment>
            <NumericInput
                className={"input--numeric " + (field.localizedError ? "input--warning" : null)}
                required={required}
                showLabel={showLabel}
                label={field.label}
                max={maxValue}
                min={minValue}
                format={type}
                step={step}
                disabled={disabled || field.disabled}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                defaultValue={null}
                value={value}
                placeholder={field.placeholder}
            />
            {renderIf(isSome(field.localizedError))(<div
                className="validation__message"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>)}
        </React.Fragment>
    )
});

export default NumericInputFieldTemplate;
