import React from 'react';
import { BasicTextAreaTemplate } from 'themes/components';
import { defaultTemplate } from 'core/utils';

function BasicTextArea(props) {
  return <BasicTextAreaTemplate {...props} />;
}

export default defaultTemplate(BasicTextArea);
