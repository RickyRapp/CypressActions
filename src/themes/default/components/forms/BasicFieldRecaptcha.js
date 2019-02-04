import React from 'react';

import { defaultTemplate } from 'core/utils';
import { renderIf, isSome } from 'core/utils';
import { BaasicRecaptcha } from 'core/components';

const BasicFieldRecaptchaTemplate = defaultTemplate(({ field }) => {
  return (
    <div className="recaptcha">
      <label htmlFor={field.id}>{field.label}</label>
      <BaasicRecaptcha verifyCallback={response => field.set(response)} />
      {renderIf(isSome(field.error))(
        <p className="type--tiny type--color--error">{field.error}</p>
      )}
    </div>
  );
});

export default BasicFieldRecaptchaTemplate;
