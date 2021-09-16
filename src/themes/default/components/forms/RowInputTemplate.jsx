import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { renderIf, isSome } from 'core/utils';
import { NumericInput } from 'core/components';
import '@progress/kendo-react-intl';

const RowInput = defaultTemplate(({ field, t, showLabel = true, disabled }) => {
    const required = field.rules && field.rules.indexOf('required') !== -1;
    const requiredMark = required ? <span className="type--color--note u-mar--left--tny">*</span> : null;
    const maxValue =
        field.rules && field.rules.indexOf('max') !== -1 ? parseInt(/max:(\d+)/.exec(field.rules)[1]) : undefined;
    const minValue =
        field.rules && field.rules.indexOf('min') !== -1 ? parseInt(/min:(\d+)/.exec(field.rules)[1]) : undefined;

    let type = 'n2';
    if (field.type == 'integer') type = 'n0';

    const value = field.value === '' ? null : field.value;

    return (
        <div className="form__group--inline">
            <div className="flex">
                {showLabel && (
                    <div className="form__group__label form__group__label--lowercase " htmlFor={field.id}>
                        {t(field.label)}
                        {requiredMark}
                    </div>
                )}
                {!showLabel ? requiredMark : null}
                <NumericInput
                    className={'k-input--inline'}
                    required={required}
                    showLabel={false}
                    label={field.label}
                    max={maxValue}
                    min={minValue}
                    format={type}
                    disabled={disabled || field.disabled}
                    onChange={field.onChange}
                    defaultValue={null}
                    value={value}
                />
            </div>
            {renderIf(isSome(field.localizedError))(
                <p className="validation__message w--100">{field.localizedError}</p>
            )}
        </div>
    );
});

export default RowInput;
