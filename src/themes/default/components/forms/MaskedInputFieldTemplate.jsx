import React from 'react';
import { defaultTemplate } from 'core/hoc';

import { MaskedInput } from 'core/components';
import { renderIf, isSome } from 'core/utils';
import '@progress/kendo-react-intl'

const MaskedInputFieldTemplate = defaultTemplate(({ field, showLabel = true, disabled, onChange }) => {
    const required = field.rules && field.rules.indexOf('required') !== -1;

    let mask = '';
    if (field.extra) {
        if (field.extra.mask) {
            mask = field.extra.mask;
        }
    }

    const value = field.value === '' ? null : field.value;

    const handleOnChange = (event) => {
        field.onChange(event);

        if (onChange) {
            onChange(event)
        }
    }

    return (
        <React.Fragment>
            <MaskedInput
                className={"input--numeric " + (field.localizedError ? "input--warning" : null)}
                required={required}
                showLabel={showLabel}
                label={field.label}
                mask={mask}
                disabled={disabled || field.disabled}
                onChange={handleOnChange}
                defaultValue={null}
                value={value}
            />
            {renderIf(isSome(field.localizedError))(<div
                className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>)}
        </React.Fragment>
    )
});

export default MaskedInputFieldTemplate;
