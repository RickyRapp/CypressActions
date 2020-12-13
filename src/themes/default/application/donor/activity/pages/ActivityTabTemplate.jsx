import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader } from 'core/layouts';
import { GrantTab } from 'application/donor/activity/grant/pages';
import { ContributionTab } from 'application/donor/activity/contribution/pages';
import { TransactionTab } from 'application/donor/activity/transaction/pages';
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
                <div label={'ACTIVITY.DEPOSITS'}>
                    <ContributionTab />
                </div>
                <div label={'ACTIVITY.GRANTS'}>
                    <GrantTab />
                </div>
            </React.Fragment>
        )
    }

    return (
        <Page>
            <PageHeader hideTitle={true}>
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