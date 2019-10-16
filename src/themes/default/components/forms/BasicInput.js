import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { renderIf, isSome } from 'core/utils';

const BasicInputTemplate = defaultTemplate(({ field, t, showLabel = true, disabled, onBlur = null }) => {
    const { placeholder, ...otherProps } = field.bind();

    if (otherProps.value && typeof otherProps.value === 'string')
        otherProps.value = otherProps.value.replace(/\s+/g, ' ');
    if (otherProps.value == null)
        otherProps.value = '';
    if (onBlur)
        otherProps.onBlur = onBlur;

    const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;

    return (
        <div>
            {
                showLabel && (
                    <label className="form__group__label" htmlFor={field.id}>{t(field.label)}{requiredMark}</label>)
            }
            {!showLabel ? requiredMark : null}
            <input
                className={"input input--med input--text" + (field.touched && !field.isValid ? " input--warning" : '')} {...otherProps}
                disabled={disabled || otherProps.disabled} placeholder={t(placeholder)} autoComplete={field.initialSetup.autoComplete === 'off' ? 'new-password' : null} />
            {renderIf(isSome(field.localizedError))(<div
                className="type--tny type--color--error u-mar--top--tny"> <i className="u-icon u-icon--xsml u-icon--warning u-mar--right--tny"></i>{field.localizedError}</div>)}
        </div>
    )
});

export default BasicInputTemplate;
