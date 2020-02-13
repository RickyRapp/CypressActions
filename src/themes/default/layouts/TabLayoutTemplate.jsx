import React from 'react';
import PropTypes from 'prop-types';

import { TabsHeader } from 'core/components';
import { PageNavigation, Content } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';

import _ from 'lodash';

const TabLayoutTemplate = function ({ title, children, store, showNavigation, loading }) {
    const { activeIndex, isError = false } = store;
    const { isLoading } = resolveProps({ loading, store });

    return (
        <Content isError={isError} loading={isLoading}>
            {/*TODO: insert page header?*/}
            {showNavigation && <PageNavigation></PageNavigation>}
            <TabsHeader tabsStore={store}>{children}</TabsHeader> {/* jshint ignore:line */}
            {title}
            {/* TODO: give parent route name? */}
            {renderTabsContent(activeIndex, children)}
        </Content>
    );
};

TabLayoutTemplate.propTypes = {
    store: PropTypes.any,
    title: PropTypes.string,
    children: PropTypes.any,
    showNavigation: PropTypes.bool,
    loading: PropTypes.bool,
};

// vice-versa compatibility with settings props as well as using store
function resolveProps({ loading, store }) {
    return {
        isLoading: _.isBoolean(loading) ? loading : store ? store.loaderStore.initial && store.loaderStore.loading : false,
    };
}

function renderTabsContent(activeIndex, children) {
    const tabs = React.Children.toArray(children);
    const tab = tabs[activeIndex];
    if (tab) {
        return tab;
    }

    return null;
}

export default defaultTemplate(TabLayoutTemplate);