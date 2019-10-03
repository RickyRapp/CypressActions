import React from 'react';
import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';

const BasicInputTemplate = defaultTemplate(({ field, t, showLabel = true, disabled }) => {
  const { placeholder, ...otherProps } = field.bind();

  if (otherProps.value && typeof otherProps.value === "string")
    otherProps.value = otherProps.value.replace(/\s+/g, " ");

  const requiredMark = field.rules && field.rules.indexOf('required') !== -1 ? <span>*</span> : null;

  return (
    <div>
      {
        showLabel && (
          <div className="form__group__label" htmlFor={field.id}>{t(field.label)}{requiredMark}</div>)
      }
      {!showLabel ? requiredMark : null}
      <input
        className={"input input--med input--text" + (field.touched && !field.isValid ? " input--warning" : "")} {...otherProps}
        disabled={disabled || otherProps.disabled} placeholder={t(placeholder)} />
      {renderIf(isSome(field.localizedError))(<p
        className="type--tiny type--color--error">{field.localizedError}</p>)}
    </div>
  )
});

export default BasicInputTemplate;
