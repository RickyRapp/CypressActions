import React from 'react';
import PropTypes from 'prop-types';

import { TabsHeader } from 'core/components';
import { PageNavigation, Content } from 'core/layouts';
import { defaultTemplate } from 'core/hoc';

import _ from 'lodash';
import renderTabsContent from 'core/utils/renderTabsContent';

const TabLayoutTemplate = function ({ title, children, store, showNavigation, loading, activeClassName }) {
    const { activeIndex, isError = false } = store;
    const { isLoading } = resolveProps({ loading, store });

    return (
        <Content isError={isError} loading={isLoading}>
            {/*TODO: insert page header?*/}
            {showNavigation && <PageNavigation></PageNavigation>}
            <TabsHeader activeClassName={activeClassName} tabsStore={store}>{children}</TabsHeader> {/* jshint ignore:line */}
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
    activeClassName: PropTypes.string,
};

// vice-versa compatibility with settings props as well as using store
function resolveProps({ loading, store }) {
    return {
        isLoading: _.isBoolean(loading) ? loading : store ? store.loaderStore.initial && store.loaderStore.loading : false,
    };
}

export default defaultTemplate(TabLayoutTemplate);