import React from 'react';
import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';

const BasicInputTemplate = defaultTemplate(({ field }) => {
  return (
    <div className="inputgroup">
      <label htmlFor={field.id}>{field.label}</label>
      <input className="input input--med input--text" {...field.bind()} />
      {renderIf(isSome(field.error))(
        <p className="type--tiny type--color--error">{field.error}</p>
      )}
    </div>
  );
});

export default BasicInputTemplate;
