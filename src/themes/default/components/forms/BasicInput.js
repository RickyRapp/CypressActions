import React from 'react';
import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';

const BasicInputTemplate = defaultTemplate(({ field, label = null }) => {
  return (
    <div className="inputgroup">
      <label htmlFor={field.id}>{label ? label : field.label} </label>
      <input className={field.disabled ? "input input--med input--text input--disabled" : "input input--med input--text"} {...field.bind()} />
      {renderIf(isSome(field.error))(
        <p className="type--tiny type--color--error">{field.error}</p>
      )}
    </div>
  );
});

export default BasicInputTemplate;
