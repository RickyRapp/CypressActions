import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader, TabLayout } from 'core/layouts';
import { GrantTab } from 'application/activity/grant/pages';
import { DepositTab } from 'application/activity/deposit/pages';
import { TransactionTab } from 'application/activity/transaction/pages';
import { TabsHeader } from 'core/components';
import renderTabsContent from 'core/utils/renderTabsContent';

function ActivityTabTemplate({ activityTabViewStore }) {
    const { activeIndex } = activityTabViewStore;

    const children = () => {
        return (
            <React.Fragment>
                <div label={'ACTIVITY.TRANSACTIONS'}>
                    <TransactionTab />
                </div>
                <div label={'ACTIVITY.DEPOSITS'} className="u-padd--top--med">
                    <DepositTab />
                </div>
                <div label={'ACTIVITY.GRANTS'} className="u-padd--top--med">
                    <GrantTab />
                </div>
            </React.Fragment>
        )
    }

    return (
        <Page>
            <PageHeader>
                <TabsHeader tabsStore={activityTabViewStore}>{children().props.children}</TabsHeader>
            </PageHeader>

            <div className='container'>
                {renderTabsContent(activeIndex, children().props.children)}
            </div>
        </Page>
    );
}

ActivityTabTemplate.propTypes = {
    activityTabViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ActivityTabTemplate);