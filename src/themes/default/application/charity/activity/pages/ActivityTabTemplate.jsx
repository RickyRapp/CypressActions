import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, PageHeader } from 'core/layouts';
import { AllTransactionList, GrantsList, RemoteDepositsList, PaymentsList, DepositsInsight, CharityWithdrawList } from 'application/charity/activity/pages';
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
                    <RemoteDepositsList />
                </div>
                <div label={'CHARITY_ACTIVITY.PAYMENTS'}>
                    <PaymentsList />
                </div>
                <div label={'CHARITY_ACTIVITY.DEPOSITS_INSIGHT'}>
                    <DepositsInsight />
                </div>
                <div label={'CHARITY_ACTIVITY.WITHDRAWS'}>
                    <CharityWithdrawList />
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
    activityTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ActivityTabTemplate);