import React from 'react';
import { defaultTemplate } from 'core/utils';

function PageContentSidebarTemplate({ children }) {
    return <div className="content__main__aside active">{children}</div>
}

export default defaultTemplate(PageContentSidebarTemplate);