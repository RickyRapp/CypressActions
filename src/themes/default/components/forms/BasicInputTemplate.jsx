import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { renderIf, isSome } from 'core/utils';

const BasicInputTemplate = defaultTemplate(({ field, t, showLabel = true, showMark = true, disabled }) => {
    const { placeholder, ...otherProps } = field.bind();

    if (otherProps.value && typeof otherProps.value === 'string')
        otherProps.value = otherProps.value.replace(/\s+/g, ' ');
    if (otherProps.value == null) otherProps.value = '';

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span className="type--color--note u-mar--left--tny">*</span> : null;

    return (
        <React.Fragment>
            {showLabel && (
                <label className="form__group__label" htmlFor={field.id}>
                    {t(field.label)}
                    {showMark && requiredMark}
                </label>
            )}
            <input
                className={'input input--lrg input--text' + (field.touched && !field.isValid ? ' input--warning' : '')}
                {...otherProps}
                disabled={disabled || otherProps.disabled}
                autoFocus={field.initialSetup.autoFocus}
                placeholder={t(placeholder)}
            />
            {renderIf(isSome(field.localizedError))(
                <p className="validation__message">{field.localizedError}</p>
            )}
        </React.Fragment>
    );
});

export default BasicInputTemplate;
