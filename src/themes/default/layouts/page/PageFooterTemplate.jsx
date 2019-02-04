import React from 'react';
import { defaultTemplate } from 'core/utils';

function PageFooterTemplate({ children, ...props }) {
  if (children) {
    const contentRender =
      typeof children === 'function' ? children(props) : children;
    if (contentRender) {
      return (
        <div className="content__footer">
          <div>{contentRender}</div>
        </div>
      );
    }
  }

  return null;
}

export default defaultTemplate(PageFooterTemplate);
