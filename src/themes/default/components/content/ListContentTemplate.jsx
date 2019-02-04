import React from 'react';
import { defaultTemplate } from 'core/utils';
import { Content } from 'core/layouts';
import shouldRenderContentChildren from './shouldRenderContentChildren';

function ListContentTemplate({ children }) {
  return (
    <React.Fragment>
      {shouldRenderContentChildren(children) ? (
        children
      ) : (
        <div className="card card--med card--primary">{children}</div>
      )}
    </React.Fragment>
  );
}

export default defaultTemplate(ListContentTemplate);
