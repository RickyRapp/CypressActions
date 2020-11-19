import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { TabLayout } from 'core/layouts';
import { GrantTab } from 'application/activity/grant/pages';
import { DepositTab } from 'application/activity/deposit/pages';
import { TransactionTab } from 'application/activity/transaction/pages';

function ActivityTabTemplate({ activityTabViewStore }) {

    return (
        <div className='container'>
            <TabLayout store={activityTabViewStore}>
                <div label={'ACTIVITY.TRANSACTIONS'} className="u-padd--top--med">
                    <TransactionTab />
                </div>
                <div label={'ACTIVITY.DEPOSITS'} className="u-padd--top--med">
                    <DepositTab />
                </div>
                <div label={'ACTIVITY.GRANTS'} className="u-padd--top--med">
                    <GrantTab />
                </div>
            </TabLayout>
        </div>
    );
}

ActivityTabTemplate.propTypes = {
    activityTabViewStore: PropTypes.object.isRequired
};

export default defaultTemplate(ActivityTabTemplate);