import React from 'react';
import { defaultTemplate } from 'core/utils';

function NotFoundTemplate({}) {
  return <span>Page is not founda</span>;
}

export default defaultTemplate(NotFoundTemplate);
