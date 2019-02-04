import React from 'react';
import {
  PageHeader,
  PageFooter,
  PageNavigation,
  PageContentHeader,
  PageContentFooter,
  PageContentSidebar
} from 'core/layouts';

function getPageObject(children) {
  const page = {
    header: null,
    footer: null,
    navigation: null,
    content: {
      header: null,
      footer: null,
      sidebar: null,
      children: null
    }
  };

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return;
    switch (child.type) {
      case PageHeader:
        if (!page.header) page.header = [];
        page.header.push(child);
        break;
      case PageFooter:
        if (!page.footer) page.footer = [];
        page.footer.push(child);
        break;
      case PageNavigation:
        if (!page.navigation) page.navigation = [];
        page.navigation.push(child);
        break;
      case PageContentHeader:
        if (!page.content.header) page.content.header = [];
        page.content.header.push(child);
        break;
      case PageContentFooter:
        if (!page.content.footer) page.content.footer = [];
        page.content.footer.push(child);
        break;
      case PageContentSidebar:
        if (!page.content.sidebar) page.content.sidebar = [];
        page.content.sidebar.push(child);
        break;
      default:
        if (!page.content.children) page.content.children = [];
        page.content.children.push(child);
        break;
    }
  });

  return page;
}

function initialize(array) {
  return content.length > 0 ? content : null;
}

export { getPageObject };
