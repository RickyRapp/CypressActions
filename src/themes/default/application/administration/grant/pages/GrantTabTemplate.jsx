import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader } from 'core/layouts';
import { GrantList, ScheduledGrantList } from 'application/administration/grant/pages';
import renderTabsContent from 'core/utils/renderTabsContent';
import { TabsHeader } from 'core/components';

const GrantTabTemplate = function ({ grantTabViewStore }) {
    const {
        loaderStore,
        activeIndex
    } = grantTabViewStore;

    const children = () => {
        return (
            <React.Fragment>
                <div label={'GRANT.TAB.LIST'} className="u-mar--top--sml">
                    <GrantList />
                </div>
                <div label={'GRANT.TAB.SCHEDULED_LIST'} className="u-mar--top--sml">
                    <ScheduledGrantList />
                </div>
            </React.Fragment>
        )
    }

    return (
        <Page loading={loaderStore.loading}>
            <PageHeader>
                <div className="col col-sml-12 123">
                <TabsHeader tabsStore={grantTabViewStore}>{children().props.children}</TabsHeader>
                </div>
            </PageHeader>
            <div className='container'>
                {renderTabsContent(activeIndex, children().props.children)}
            </div>
        </Page>
    );
}

GrantTabTemplate.propTypes = {
    grantTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(GrantTabTemplate);