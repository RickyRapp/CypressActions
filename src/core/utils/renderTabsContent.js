import React from 'react';

function renderTabsContent(activeIndex, children) {
    const tabs = React.Children.toArray(children);
    const tab = tabs[activeIndex < 0 || activeIndex > tabs.length - 1 ? (activeIndex = 0) : activeIndex];
    if (tab) {
        return tab;
    }

    return null;
}

export default renderTabsContent;