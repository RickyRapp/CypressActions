import React from 'react';
import { defaultTemplate } from 'core/hoc';

import { NumericInput } from 'core/components';
import { renderIf, isSome } from 'core/utils';
import '@progress/kendo-react-intl'

const NumericInputFieldTemplate = defaultTemplate(({ field, showLabel = true, disabled }) => {
    const required = field.rules && field.rules.indexOf('required') !== -1;
    const maxValue = field.rules && field.rules.indexOf('max') !== -1 ? parseInt((/max:(\d+)/).exec(field.rules)[1]) : undefined;
    const minValue = field.rules && field.rules.indexOf('min') !== -1 ? parseInt((/min:(\d+)/).exec(field.rules)[1]) : undefined;

    let type = 'n2';
    if (field.type == 'integer')
        type = 'n0';

    const value = field.value === '' ? null : field.value;

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
                disabled={disabled || field.disabled}
                onChange={field.onChange}
                defaultValue={null}
                value={value}
            />
            {renderIf(isSome(field.localizedError))(<div
                className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>)}
        </React.Fragment>
    )
});

export default NumericInputFieldTemplate;
