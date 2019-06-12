import React from 'react';
import { defaultTemplate } from 'core/utils';
import { renderIf } from 'core/utils';

const BasicTextAreaTemplate = defaultTemplate(({ field }) => {
  return (
    <div className="inputgroup">
      <label htmlFor={field.id}>{field.label}</label>
      <textarea
        className="input input--med input--textarea"
        {...field.bind()}
      // onChange={(e) => onChange(e.target.name, e.target.value)}
      />
      {renderIf(field.error)(
        <p className="type--tiny type--color--error">{field.error}</p>
      )}
    </div>
  );
});

export default BasicTextAreaTemplate;
