import React from 'react';
import { defaultTemplate } from 'core/utils';

function YesNoViewTemplate({
  message,
  onConfirm,
  onCancel,
  yesLabel = 'Yes',
  noLabel = 'No',
  ...other
}) {
  return (
    <div>
      <span>{message}</span>
      <button onClick={onConfirm}>{yesLabel}</button>
      <button onClick={onCancel}>{noLabel}</button>
    </div>
  );
}

export default defaultTemplate(YesNoViewTemplate);
