import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import { Page, TabLayout } from 'core/layouts';
import { ActivityTransactionTab, ActivityGrantTab } from 'application/activity/pages';

function ActivityTabTemplate({ activityTabViewStore, t }) {

    return (
        <div className='container'>
            <TabLayout store={activityTabViewStore}>
                <div label={'ACTIVITY.TRANSACTIONS'}>
                    <ActivityTransactionTab />
                </div>
                <div label={'ACTIVITY.DEPOSITS'}>
                    2
            </div>
                <div label={'ACTIVITY.GRANTS'}>
                    <ActivityGrantTab />
                </div>
            </TabLayout>
        </div>
    );
}

ActivityTabTemplate.propTypes = {
    activityTabViewStore: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired
};

export default defaultTemplate(ActivityTabTemplate);