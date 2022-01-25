import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader } from 'core/layouts';
import { AllTransactionList, GrantsList } from 'application/charity/activity/pages';
import { TabsHeader } from 'core/components';
import renderTabsContent from 'core/utils/renderTabsContent';

const ActivityTabTemplate = function ({ activityTabViewStore }) {
    const { activeIndex } = activityTabViewStore;

    const children = () => {
        return (
            <React.Fragment>
                <div label={'CHARITY_ACTIVITY.ALL_TRANSACTIONS'}>
                    <AllTransactionList hideSearch={false} />
                </div>
                <div label={'CHARITY_ACTIVITY.GRANTS'}>
                    <GrantsList />
                </div>
                <div label={'CHARITY_ACTIVITY.REMOTE DEPOSITS'}>
                    <GrantsList />
                </div>
            </React.Fragment>
        )
    }

    return (
        <Page>
            <PageHeader hideTitle={true}>
                <div className="col col-sml-12">
                <TabsHeader tabsStore={activityTabViewStore}>{children().props.children}</TabsHeader>
                </div>
            </PageHeader>

            <div className='container'>
                {renderTabsContent(activeIndex, children().props.children)}
            </div>
        </Page>
    );
}

ActivityTabTemplate.propTypes = {
    activityTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ActivityTabTemplate);