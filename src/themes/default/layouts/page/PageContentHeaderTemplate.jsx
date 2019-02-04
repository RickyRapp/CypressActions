import React from 'react';
import { defaultTemplate } from 'core/utils';

function PageContentHeaderTemplate({ children }) {
  return <React.Fragment>{children}</React.Fragment>;
}

export default defaultTemplate(PageContentHeaderTemplate);
