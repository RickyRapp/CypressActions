import React from 'react';
import { defaultTemplate } from 'core/utils';
import { YesNoViewTemplate } from 'themes/components';

function YesNoView(props) {
  return <YesNoViewTemplate {...props} />
}

export default defaultTemplate(YesNoView);