import React from 'react';
import { defaultTemplate } from 'core/utils';

function PageContentFooterTemplate({ children }) {
  return <React.Fragment>{children}</React.Fragment>;
}

export default defaultTemplate(PageContentFooterTemplate);
