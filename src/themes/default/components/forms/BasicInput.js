import React from 'react';
import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';

const BasicInputTemplate = defaultTemplate(({ field, label = null }) => {
  return (
    <div className="inputgroup">
      <label htmlFor={field.id}>{label ? label : field.label} <strong>{field.disabled ? 'Disabled' : ''}</strong></label>
      <input className="input input--med input--text" {...field.bind()} />
      {renderIf(isSome(field.error))(
        <p className="type--tiny type--color--error">{field.error}</p>
      )}
    </div>
  );
});

export default BasicInputTemplate;
