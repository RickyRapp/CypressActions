import React from 'react';
import PropTypes from 'prop-types';
import { TabHeader } from 'core/components';
import { defaultTemplate } from 'core/hoc';

function TabsHeader({ tabsStore, children, t, activeClassName}) {
    return <div className="tabs tabs--primary">{renderTabs(tabsStore, children, t, activeClassName)}</div>;
}

function renderTabs(tabsStore, children, t, activeClassName) {
    return React.Children.map(children, (tab, idx) => {
        if (!tab) return null;
        const { label } = tab.props;
        return (
            <TabHeader
                key={idx}
                activeClassName={activeClassName}
                label={label}
                onClick={() => tabsStore.handleTabClick(idx)}
                tabIndex={idx}
                t={t}
                isActive={idx === tabsStore.activeIndex}
            />
        );
    });
}

TabsHeader.propTypes = {
    tabsStore: PropTypes.object,
    children: PropTypes.any,
    t: PropTypes.func,
};

export default defaultTemplate(TabsHeader);
