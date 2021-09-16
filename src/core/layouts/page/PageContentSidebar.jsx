import React from 'react';
import { inject } from 'mobx-react';
import { PageContentSidebarTemplate } from 'themes/layouts';

function PageContentSidebar(props) {
    return <PageContentSidebarTemplate {...props} />;
}

export default inject(i => ({
    contentSidebarVisible: i.rootStore.viewStore.contentSidebarVisible,
    toggleContentSidebarVisibility: i.rootStore.viewStore.toggleContentSidebarVisibility
}))(PageContentSidebar);